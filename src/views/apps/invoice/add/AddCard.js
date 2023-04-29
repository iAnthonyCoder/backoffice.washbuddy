// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import { CardHeader } from '@mui/material'
import { business_itemService } from 'services/business_item.service'

const CustomInput = forwardRef(({ ...props }, ref) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      {...props}
    />
  )
})

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const InvoiceAction = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const CustomSelectItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
}))
const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddCard = props => {
  // ** Props
  const { clients, invoiceNumber, selectedClient, setSelectedClient, toggleAddCustomerDrawer } = props

  // ** States
  const [count, setCount] = useState(1)
  const [selected, setSelected] = useState('')
  const [issueDate, setIssueDate] = useState(new Date())
  const [dueDate, setDueDate] = useState(new Date(tomorrowDate))

  

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const deleteForm = e => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  // ** Handle Invoice To Change
  const handleInvoiceChange = event => {
    setSelected(event.target.value)
    if (clients !== undefined) {
      setSelectedClient(clients.filter(i => i.name === event.target.value)[0])
    }
  }

  const handleAddNewCustomer = () => {
    toggleAddCustomerDrawer()
  }

  const [ items, setItems ] = useState([])
  const [ loadingItems, setLoadingItems ] = useState(true)

  const getItems = async () => {
    try {
      setLoadingItems(true)
      const response = await business_itemService.get()
      setItems(response.data)
      setLoadingItems(false)
    } catch (er) {
      console.log(er);
    }
  }

  useEffect(()=>{
    getItems()
  }, [])
  

  return (
    <Card>
      <CardHeader title='New Order' />
      
      <Divider sx={{ mb: theme => `${theme.spacing(1.25)} !important` }} />
      <CardContent>
  
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
            <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary' }}>
              Customer
            </Typography>
            <TextField 
			  		  fullWidth 
				    	label='Search Customer by Email or Phone' 
				    	placeholder='customer@example.com' 
              id='user_id' 
              name='user_id'
              type='search'
              // onChange={formik.handleChange}
              // value={formik.values.price}
              // error={formik.touched.price && Boolean(formik.errors['price'])}
              // disabled={formik.isSubmitting}
				    />
            {selectedClient !== null && selectedClient !== undefined ? (
              <div>
                <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                  {selectedClient.company}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                  {selectedClient.address}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                  {selectedClient.contact}
                </Typography>
                <Typography variant='body2' sx={{ mb: 1, color: 'text.primary' }}>
                  {selectedClient.companyEmail}
                </Typography>
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: ['flex-start', 'flex-end'] }}>
            <div>
              <Typography variant='subtitle2' sx={{ mb: 2.5, color: 'text.primary' }}>
                Customer details
              </Typography>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'><strong>First Name:</strong>&nbsp;</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'><strong>Last Name:</strong>&nbsp;</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'><strong>Email:</strong>&nbsp;</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'><strong>Phone:</strong>&nbsp;</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'><strong>Address:</strong>&nbsp;</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'></Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ mb: theme => `${theme.spacing(1.25)} !important` }} />

      <RepeaterWrapper>
        <Repeater count={count}>
          {i => {
            const Tag = i === 0 ? Box : Collapse

            return (
              <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                <Grid container>
                  <RepeatingContent item xs={12}>
                    <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                      <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          placeholder='Select an item'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                          Item
                        </Typography>
                        <Select fullWidth size='small' defaultValue='App Design'>
                          {
                            items.map(x =><MenuItem value={x.id}>{x.item.name}</MenuItem> )
                          }
                        </Select>
                        
                      </Grid>
                      <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                          Price
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                        
                          
                          disabled={true}
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                       
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                          Quantity
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='1'
                          defaultValue='1'
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item lg={2} md={1} xs={12} sx={{ px: 4, my: { lg: 0 }, mt: 2, display:'flex', alignItems:'center' }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                       
                        </Typography>
                        <Typography variant='body1'>$24.00</Typography>
                      </Grid>
                    </Grid>
                    <InvoiceAction>
                      <IconButton size='small' onClick={deleteForm}>
                        <Icon icon='mdi:close' fontSize={20} />
                      </IconButton>
                    </InvoiceAction>
                  </RepeatingContent>
                </Grid>
              </Tag>
            )
          }}
        </Repeater>

        <Grid container sx={{ mt: 4.75 }}>
          <Grid item xs={12} sx={{ px: 0 }}>
            <Button
              size='small'
              variant='contained'
              startIcon={<Icon icon='mdi:plus' fontSize={20} />}
              onClick={() => setCount(count + 1)}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      </RepeaterWrapper>

      {/* <Divider /> */}

      {/* <CardContent>
        <Grid container>
          <Grid item xs={12} sm={9} sx={{ order: { sm: 1, xs: 2 } }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='body2'
                sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
              >
                Salesperson:
              </Typography>
              <TextField
                size='small'
                defaultValue='Tommy Shelby'
                sx={{ maxWidth: '150px', '& .MuiInputBase-input': { color: 'text.secondary' } }}
              />
            </Box>
            <TextField
              size='small'
              placeholder='Thanks for your business'
              sx={{ maxWidth: '300px', '& .MuiInputBase-input': { color: 'text.secondary' } }}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
            <CalcWrapper>
              <Typography variant='body2'>Subtotal:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                $1800
              </Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography variant='body2'>Discount:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                $28
              </Typography>
            </CalcWrapper>
            <CalcWrapper>
              <Typography variant='body2'>Tax:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                21%
              </Typography>
            </CalcWrapper>
            <Divider
              sx={{ mt: theme => `${theme.spacing(6)} !important`, mb: theme => `${theme.spacing(1.5)} !important` }}
            />
            <CalcWrapper>
              <Typography variant='body2'>Total:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', lineHeight: '.25px' }}>
                $1690
              </Typography>
            </CalcWrapper>
          </Grid>
        </Grid>
      </CardContent> */}

      <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

      <CardContent sx={{ pt: 4 }}>
        <InputLabel htmlFor='invoice-note'>Note:</InputLabel>
        <TextField
          rows={2}
          fullWidth
          multiline
          id='invoice-note'
          sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
          defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
        />
      </CardContent>
    </Card>
  )
}

export default AddCard
