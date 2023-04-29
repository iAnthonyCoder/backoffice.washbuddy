import { useState, forwardRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import Icon from 'src/@core/components/icon'
import useBgColor from 'src/@core/hooks/useBgColor'
import * as Yup from 'yup';
import { CircularProgress, FormHelperText, InputAdornment } from '@mui/material'
import { userService } from 'services/user.service'
import { green } from '@mui/material/colors'
import { toast } from 'react-hot-toast'
import InputMask from "react-input-mask";
import { itemService } from 'services/item.service'
import FallbackSpinner from 'src/@core/components/spinner'
import { business_itemService } from 'services/business_item.service'

const Transition = forwardRef(function Transition(props, ref) {
	return <Fade ref={ref} {...props} />
})



const DialogAddBusinessItem = (props) => {

    const { show, setShow, recordToEdit, setRecordToEdit, fetchData } = props

	const [ items, setItems ] = useState(null)

	const [ loadingItems, setLoadingItems ] = useState(true)

	useEffect(() => {
		getItems()
	}, [])

	const getItems = async() => {
		try {
			setLoadingItems(true)
			let response = await itemService.get('?page_size=100')
			setItems(response.data)
			setLoadingItems(false)
		} catch (er) {
			console.log(er);
		}
	}

  const [addressType, setAddressType] = useState('home')

  const bgColors = useBgColor()

  	const validationSchema = Yup.object().shape({
		price: Yup.number()
			.min(0, 'Wrong item selected')
			.max(100000, 'Wrong item selected'),
		item_id: Yup.number()
			.required('Item is required')
            .min(1, 'Wrong item selected')
			.max(100, 'Wrong item selected'),
	})

  	const formik = useFormik({
		enableReinitialize: true,
		initialValues: Boolean(recordToEdit) ? {
			price: recordToEdit.price,
			item_id: recordToEdit.item_id,
		} : {
			price:'',
			item_id: null
		},
		validationSchema,
		onSubmit: values => submitData(values),
	});

	const submitData = async (values) => {
        try {	
			if(Boolean(recordToEdit)){
				await business_itemService.update(recordToEdit.id, {
					price: values.price,
				})
				setShow(false)
				formik.resetForm()
				toast.success('Updated sucessfully!')
			
				fetchData()
				return true
			} else {
				await business_itemService.create({
					price: values.price,
					item_id: values.item_id
				})
				setShow(false)
				formik.resetForm()
				
				toast.success('Saved sucessfully!')
				fetchData()
				return true
			}
		} catch (er) {
			console.log(er);
			er.errors.map(x =>{
                if(x.path && x.path.length>0){
					formik.setFieldError(x.path[0], x.message)
				}
				toast.error(x.message)
            })
			return true
		}
    }



  return (
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
		{
			loadingItems ? (
				<div style={{display:'flex', paddingTop:'5rem', paddingBottom:'5rem', justifyContent:'center'}}>
					<CircularProgress/>
				</div>
			) : (
				<form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 9, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Add New Item
            </Typography>
            {/* <Typography variant='body2'>Add address for billing address</Typography> */}
          </Box>
          <Grid container spacing={6}>
			
			{
				!Boolean(recordToEdit) && <Grid item sm={6} xs={12}>
				<FormControl fullWidth>
				  <InputLabel id='country-select'>Type</InputLabel>
				  <Select
					  value={formik.values.item_id} 
					fullWidth
					error={Boolean(formik.errors.item_id)}
					placeholder='Springfield'
					label='City'
					name='item_id'
					labelId='country-select'
					onChange={formik.handleChange} 
					disabled={formik.isSubmitting}
				  
					id='item_id' 
			  
				  >
					  
					  {
						  items.map(x => <MenuItem value={x.id}>{x.name}</MenuItem>)
					  }
				  </Select>
				</FormControl>
				{console.log(formik.errors)}
				{
					  formik.touched.city && formik.errors.city && (
						  <FormHelperText 
							  sx={{ color: 'error.main' }}
						  >
							  {formik.errors.city}
						  </FormHelperText>
					  )
				  }		
			  </Grid>
			}
			<Grid item sm={!Boolean(recordToEdit) ? 6 : 12} xs={12}>
              	<TextField 
			  		fullWidth 
					label='Price in USD' 
					placeholder='00000' 
                	id='price' 
                	name='price'
                	type='number'
                	onChange={formik.handleChange}
                	value={formik.values.price}
                	error={formik.touched.price && Boolean(formik.errors['price'])}
                	disabled={formik.isSubmitting}
				/>
				{
					formik.touched.price && formik.errors.price && (
						<FormHelperText 
							sx={{ color: 'error.main' }}
						>
							{formik.errors.price}
						</FormHelperText>
					)
				}												
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          
          <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
            Cancel
          </Button>
		  <Button variant='contained' type='submit' sx={{ mr: 2 }} disabled={formik.isSubmitting}>
		  		{
                  	formik.isSubmitting && <CircularProgress
                    	size={24}
                    	sx={{
                    	  color: green[500],
                    	  position: 'absolute',
                    	  top: '50%',
                    	  left: '50%',
                    	  marginTop: '-12px',
                    	  marginLeft: '-12px',
                    	}}
                  	/>
                }
                 Submit
          </Button>
        </DialogActions>
		</form>
			)
		}
		
      </Dialog>
  )
}

export default DialogAddBusinessItem
