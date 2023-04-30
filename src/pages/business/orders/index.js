import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'
import Select from '@mui/material/Select'
import Icon from 'src/@core/components/icon'
import { useDispatch, useSelector } from 'react-redux'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'
import { getInitials } from 'src/@core/utils/get-initials'
import { fetchData } from 'src/store/apps/order'
import axios from 'axios'
import TableHeader from 'src/views/apps/user/list/TableHeader'
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import DialogAddBusiness from 'src/views/apps/businesses/list/AddBusinessDialog'
import urlManager from 'utils/urlManager'
import { useRouter } from 'next/router'
import { Badge, Chip, Tooltip } from '@mui/material'
import DeleteConfirmation from 'src/views/components/dialogs/DeleteConfirmation'
import { toast } from 'react-hot-toast'
import { business_itemService } from 'services/business_item.service'
import DialogAddBusinessItem from 'src/views/apps/business_items/list/AddBusinessItemDialog'
import { EyeOutline } from 'mdi-material-ui'

const userRoleObj = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = row => {
  if (row.avatar.length) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}


const OrderList = ({ apiData }) => {


  const [ recordToDelete, setRecordToDelete ] = useState(null)

  const [ recordToEdit, setRecordToEdit ] = useState(null)

  const RowOptions = (row) => {
    // ** Hooks
    const dispatch = useDispatch()
   
  
    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)
  
    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }
  
    
  
    return (
      <>
        
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          {/* <MenuItem
           
            sx={{ '& svg': { mr: 2 } }}
            onClick={()=>{
              handleRowOptionsClose()
              router.push('/admin/businesses/[id]', '/admin/businesses/'+row.row.id)
            }}
           
          >
            <Icon icon='mdi:eye-outline' fontSize={20} />
            View
          </MenuItem> */}
          <MenuItem onClick={()=>setRecordToEdit(row.row)} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
          {/* <MenuItem onClick={()=>setRecordToDelete(row.row)} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:delete-outline' fontSize={20} />
            Delete
          </MenuItem> */}
        </Menu>
      </>
    )
  }
  
  const columns = [
    {
      flex: 0.2,
      minWidth: 180,
      field: 'item',
      headerName: 'Item',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant='body2'>
            {row.item.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'price',
      headerName: 'Price',
      renderCell: ({ row }) => {
        return (
         <>${row.price}</>
    
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 100,
      field: 'is_enabled',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <Chip label={!row.is_enabled ? 'Enabled' : 'Disabled'} size='small' variant='outlined' color={!row.is_enabled ? 'primary' : 'warning'} />
    
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <Box sx={{ display: 'flex', alignItems: 'center' }}>
        
      <Tooltip title='View Order'>
        <Box>
          <Link href={`/business/orders/${row.id}`} passHref>
            <IconButton size='small' component='a' sx={{ textDecoration: 'none', mr: 0.5 }}>
            <Icon icon='mdi:eye-outline' />
            </IconButton>
          </Link>
        </Box>
      </Tooltip>
      {/* <Tooltip title='Delete Business'>
        <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => dispatch(deleteInvoice(row.id))}>
          <DeleteOutline />
        </IconButton>
      </Tooltip> */}
    </Box>
    }
  ]
  

  const router = useRouter()
  // ** State
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.orders)
  

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])


  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  useEffect(() => {
    if(!store.total){
      dispatch(fetchData(window.location.search.replace('?', '')))
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      shallow && dispatch(
        fetchData(url.split('?')[1])
      )
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])


  return (
    <Grid container spacing={6}>
     
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} /> */}
        
          <TableHeader title='Orders' value={value} handleFilter={handleFilter} buttonClick={()=>router.push('/business/orders/add')} />
          <Divider />
          <DataGrid
            autoHeight
            disableSelectionOnClick
            disableColumnMenu
            rows={store.data}
            rowCount={store.total}
            loading={store.loading}
            page={store.current_page - 1}
            rowsPerPageOptions={[]}
            pagination
            pageSize={store.page_size}
            initialState={
              (new URLSearchParams(window.location.search).get('sort_field') && new URLSearchParams(window.location.search).get('sort_order')) ? (
                {
                  sorting: {
                    sortModel: [{ field: new URLSearchParams(window.location.search).get('sort_field'), sort: new URLSearchParams(window.location.search).get('sort_order') }],
                  }
                }
              ) : {
              }
            }
            sortingMode={'server'}
            paginationMode="server"
            onSortModelChange={(e)=>{
              if(e['0']){
                urlManager({
                  router,
                  href: '/admin/businesses',
                  as: '/admin/businesses', 
                  params:[
                    {
                      key: 'sort_field',
                      value: e['0']['field'],
                      type: 'replace'
                    },{
                      key: 'sort_order',
                      value: e['0']['sort'],
                      type: 'replace'
                    }
                  ]
                })
               
              } else {
                urlManager({
                  router,
                  href: '/admin/businesses',
                  as: '/admin/businesses', 
                  params:[
                    {
                      key: 'sort_field',
                      value: '',
                      type: 'remove'
                    },{
                      key: 'sort_order',
                      value: '',
                      type: 'remove'
                    }
                  ]
                })
             
              }
            }}
            onPageChange={(newPage) => urlManager({
              router,
              href: '/admin/businesses',
              as: '/admin/businesses', 
              params:[
                {
                  key: 'page_number',
                  value: newPage + 1,
                  type: 'replace'
                }
              ]
            })}
            onPageSizeChange={
              (newPageSize) => urlManager({
                router,
                href: '/admin/businesses',
                as: '/admin/businesses', 
                params:[
                  {
                    key: 'page_size',
                    value: newPageSize,
                    type: 'replace'
                  }
                ]
              })
              
            }
            columns={columns}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          /> 
        </Card>
      </Grid>

    </Grid>
  )
}


OrderList.acl = {
  action: 'manage',
  subject: 'business'
}
export default OrderList
