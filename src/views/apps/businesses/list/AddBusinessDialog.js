import { useState, forwardRef } from 'react'
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
import { businessService } from 'services/business.service'

const Transition = forwardRef(function Transition(props, ref) {
	return <Fade ref={ref} {...props} />
})

const cities = [
	{
		name: 'LOS ANGELES',
		id: 1
	},
	{
		name: 'NORTH HOLLYWOOD',
		id: 2
	},
	{
		name: 'VAN NUYS',
		id: 3
	},     
	{
		name: 'NORTHRIDGE',
		id: 4
	},
	{
		name: 'CANOGA PARK',
		id: 5
	},   
	{
		name: 'RESEDA',
		id: 6
	},   
	{
		name: 'ENCINO',
		id: 7
	},   
	{
		name: 'GRANADA HILLS',
		id: 8
	},   
	{
		name: 'SYLMAR',
		id: 9
	},   
	{
		name: 'PACOIMA',
		id: 10
	},   
	{
		name: 'SUNLAND',
		id: 11
	},   
	{
		name: 'BURBANK',
		id: 12
	},   
	{
		name: 'STUDIO CITY',
		id: 13
	},
	{
		name: 'WOODLAND HILLS',
		id: 14
	},
	{
		name: 'CHATSWORTH',
		id: 15
	},
	{
		name: 'GLENDALE',
		id: 16
	},
	{
		name: 'PASADENA',
		id: 17
	},
	{
		name: 'SANTA MONICA',
		id: 18
	},
	{
		name: 'INGLEWOOD',
		id: 19
	},
	{
		name: 'HAWTHORNE',
		id: 20
	},
	{
		name: 'TORRANCE',
		id: 21
	},
	{
		name: 'CARSON',
		id: 22
	},
	{
		name: 'COMPTON',
		id: 23
	},
	{
		name: 'ALHAMBRA',
		id: 24
	},
	{
		name: 'ARCADIA',
		id: 25
	},
	{
		name: 'EL MONTE',
		id: 26
	},
	{
		name: 'DOWNEY',
		id: 27
	},
	{
		name: 'NORWALK',
		id: 28
	},
	{
		name: 'LONG BEACH',
		id: 29
	},
	{
		name: 'WEST COVINA',
		id: 30
	},
	{
		name: 'WEST COVINA',
		id: 31
	},
	{
		name: 'EL MONTE',
		id: 32
	},
	{
		name: 'ALHAMBRA',
		id: 33
	}
]

const DialogAddBusiness = (props) => {

    const { show, setShow, recordToEdit, setRecordToEdit, fetchData } = props

  const [addressType, setAddressType] = useState('home')

  const bgColors = useBgColor()

  	const validationSchema = Yup.object().shape({
		email: Yup.string()
    		.required('Email is required')
			.email('Email is invalid'),
		name: Yup.string()
    		.required('Business name is required')
            .min(2, 'Business name must contain at least 2 characters')
            .max(60, 'Business name can not have more than 60 characters'),
		phone_number: Yup.string()
    		.required('Business Phone number is required')
            .min(8, 'Business Phone number must contain at least 8 characters')
            .max(16, 'Business Phone number can not have more than 16 characters'),
		address: Yup.string()
    		.required('Address is required')
            .min(4, 'Address must contain at least 4 characters')
            .max(40, 'Address can not have more than 40 characters'),
		address_line_two: Yup.string()
            .max(40, 'Address Line 2 can not have more than 40 characters'),
		zip_code: Yup.string()
    		.required('Zip code is required')
            .min(3, 'Zip code must contain at least 3 characters')
            .max(15, 'Zip code can not have more than 15 characters'),
		city_id: Yup.number()
			.required('City is required')
            .min(1, 'Wrong city selected')
			.max(100, 'Wrong city selected'),
	})

  	const formik = useFormik({
		enableReinitialize: true,
		initialValues: Boolean(recordToEdit) ? {
			email: recordToEdit.email,
			name: recordToEdit.name,
			phone_number: recordToEdit.phone_number,
			address: recordToEdit.address,
			address_line_two: recordToEdit.address_line_two,
			zip_code: recordToEdit.zip_code,
			city_id: recordToEdit.city_id,
		} : {
			email:'',
			name: '',
			phone_number: '',
			address: '',
			address_line_two: '',
			zip_code: '',
			city_id: null
		},
		validationSchema,
		onSubmit: values => submitData(values),
	});

	const submitData = async (values) => {
        try {	
			if(Boolean(recordToEdit)){
				await businessService.update(recordToEdit.id, {
					email: values.email,
					name: values.name,
					phone_number: values.phone_number,
					address: values.address,
					address_line_two: values.address_line_two,
					zip_code: values.zip_code,
					city_id: values.city_id
				})
				setShow(false)
				formik.resetForm()
				fetchData()
				return true
			} else {
				await businessService.create({
					email: values.email,
					name: values.name,
					phone_number: values.phone_number,
					address: values.address,
					address_line_two: values.address_line_two,
					zip_code: values.zip_code,
					city_id: values.city_id
				})
				setShow(false)
				formik.resetForm()
				
				fetchData()
				return true
			}
		} catch (er) {
			er.errors.map(x =>{
                formik.setFieldError(x.path[0], x.message)
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
              Add New Business
            </Typography>
            {/* <Typography variant='body2'>Add address for billing address</Typography> */}
          </Box>
		  {console.log(formik.values)}
          <Grid container spacing={6}>
			<Grid item sm={6} xs={12}>
              	<TextField 
			  		fullWidth 
					label='Name' 
					placeholder='Washers Inc.' 
                	id='name' 
                	name='name'
                	type='text'
                	onChange={formik.handleChange}
                	value={formik.values.name}
                	error={formik.touched.name && Boolean(formik.errors['name'])}
                	disabled={formik.isSubmitting}
				/>
				{
					formik.touched.name && formik.errors.name && (
						<FormHelperText 
							sx={{ color: 'error.main' }}
						>
							{formik.errors.name}
						</FormHelperText>
					)
				}												
            </Grid>
			<Grid item sm={6} xs={12}>
              	<TextField 
			  		fullWidth 
					label='Email Address' 
					placeholder='example@mail.com' 
                	id='email' 
                	name='email'
                	type='email'
                	onChange={formik.handleChange}
                	value={formik.values.email}
                	error={formik.touched.email && Boolean(formik.errors['email'])}
                	disabled={formik.isSubmitting}
				/>
				{
					formik.touched.email && formik.errors.email && (
						<FormHelperText 
							sx={{ color: 'error.main' }}
						>
							{formik.errors.email}
						</FormHelperText>
					)
				}												
            </Grid>
			<Grid item sm={6} xs={12}>
			<InputMask
                    mask="999 999 99 99"
                    value={formik.values.phone_number}
                    onChange={formik.handleChange}
                    maskChar=" "
					name='phone_number'
                  >

                    {
                      ()=>
              			<TextField 
			  				fullWidth 
							label='Telephone' 
							placeholder='202 555 0111'
                			name='phone_number'
                			error={formik.touched.phone_number && Boolean(formik.errors['phone_number'])}
							InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
						/>
					}
			</InputMask>
				{
					formik.touched.phone_number && formik.errors.phone_number && (
						<FormHelperText 
							sx={{ color: 'error.main' }}
						>
							{formik.errors.phone_number}
						</FormHelperText>
					)
				}												
            </Grid>
			<Grid item sm={6} xs={12}>
              	<TextField 
			  		fullWidth 
					label='Address' 
					placeholder='1st Ave 5501' 
                	id='address' 
                	name='address'
                	type='text'
                	onChange={formik.handleChange}
                	value={formik.values.address}
                	error={formik.touched.address && Boolean(formik.errors['address'])}
                	disabled={formik.isSubmitting}
				/>
				{
					formik.touched.address && formik.errors.address && (
						<FormHelperText 
							sx={{ color: 'error.main' }}
						>
							{formik.errors.address}
						</FormHelperText>
					)
				}												
            </Grid>
			<Grid item sm={6} xs={12}>
              	<TextField 
			  		fullWidth 
					label='Address Line 2' 
					placeholder='Apt 24' 
                	id='address_line_two' 
                	name='address_line_two'
                	type='text'
                	onChange={formik.handleChange}
                	value={formik.values.address_line_two}
                	error={formik.touched.address_line_two && Boolean(formik.errors['address_line_two'])}
                	disabled={formik.isSubmitting}
				/>
				{
					formik.touched.address_line_two && formik.errors.address_line_two && (
						<FormHelperText 
							sx={{ color: 'error.main' }}
						>
							{formik.errors.address_line_two}
						</FormHelperText>
					)
				}												
            </Grid>
			<Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id='country-select'>City</InputLabel>
                <Select
					value={formik.values.city_id} 
                  fullWidth
				  error={Boolean(formik.errors.city_id)}
                  placeholder='Springfield'
                  label='City'
				  name='city_id'
                  labelId='country-select'
				  onChange={formik.handleChange} 
				  disabled={formik.isSubmitting}
				
				  id='city_id' 
			
                >
					
					{
						cities.map(x => <MenuItem value={x.id}>{x.name}</MenuItem>)
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
			<Grid item sm={6} xs={12}>
              	<TextField 
			  		fullWidth 
					label='Zip Code' 
					placeholder='00000' 
                	id='zip_code' 
                	name='zip_code'
                	type='text'
                	onChange={formik.handleChange}
                	value={formik.values.zip_code}
                	error={formik.touched.zip_code && Boolean(formik.errors['zip_code'])}
                	disabled={formik.isSubmitting}
				/>
				{
					formik.touched.zip_code && formik.errors.zip_code && (
						<FormHelperText 
							sx={{ color: 'error.main' }}
						>
							{formik.errors.zip_code}
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
      </Dialog>
  )
}

export default DialogAddBusiness
