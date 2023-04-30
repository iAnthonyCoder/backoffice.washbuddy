// import { useState, forwardRef } from 'react'
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import Switch from '@mui/material/Switch'
// import Select from '@mui/material/Select'
// import Dialog from '@mui/material/Dialog'
// import Button from '@mui/material/Button'
// import MenuItem from '@mui/material/MenuItem'
// import TextField from '@mui/material/TextField'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import InputLabel from '@mui/material/InputLabel'
// import FormControl from '@mui/material/FormControl'
// import CardContent from '@mui/material/CardContent'
// import Fade from '@mui/material/Fade'
// import DialogContent from '@mui/material/DialogContent'
// import DialogActions from '@mui/material/DialogActions'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import { useFormik } from 'formik'
// import Icon from 'src/@core/components/icon'
// import useBgColor from 'src/@core/hooks/useBgColor'
// import * as Yup from 'yup';
// import { CircularProgress, FormHelperText, InputAdornment } from '@mui/material'
// import { userService } from 'services/user.service'
// import { green } from '@mui/material/colors'
// import { toast } from 'react-hot-toast'
// import InputMask from "react-input-mask";

// const Transition = forwardRef(function Transition(props, ref) {
// 	return <Fade ref={ref} {...props} />
// })

// const cities = [
// 	{
// 		name: 'LOS ANGELES',
// 		id: 1
// 	},
// 	{
// 		name: 'NORTH HOLLYWOOD',
// 		id: 2
// 	},
// 	{
// 		name: 'VAN NUYS',
// 		id: 3
// 	},     
// 	{
// 		name: 'NORTHRIDGE',
// 		id: 4
// 	},
// 	{
// 		name: 'CANOGA PARK',
// 		id: 5
// 	},   
// 	{
// 		name: 'RESEDA',
// 		id: 6
// 	},   
// 	{
// 		name: 'ENCINO',
// 		id: 7
// 	},   
// 	{
// 		name: 'GRANADA HILLS',
// 		id: 8
// 	},   
// 	{
// 		name: 'SYLMAR',
// 		id: 9
// 	},   
// 	{
// 		name: 'PACOIMA',
// 		id: 10
// 	},   
// 	{
// 		name: 'SUNLAND',
// 		id: 11
// 	},   
// 	{
// 		name: 'BURBANK',
// 		id: 12
// 	},   
// 	{
// 		name: 'STUDIO CITY',
// 		id: 13
// 	},
// 	{
// 		name: 'WOODLAND HILLS',
// 		id: 14
// 	},
// 	{
// 		name: 'CHATSWORTH',
// 		id: 15
// 	},
// 	{
// 		name: 'GLENDALE',
// 		id: 16
// 	},
// 	{
// 		name: 'PASADENA',
// 		id: 17
// 	},
// 	{
// 		name: 'SANTA MONICA',
// 		id: 18
// 	},
// 	{
// 		name: 'INGLEWOOD',
// 		id: 19
// 	},
// 	{
// 		name: 'HAWTHORNE',
// 		id: 20
// 	},
// 	{
// 		name: 'TORRANCE',
// 		id: 21
// 	},
// 	{
// 		name: 'CARSON',
// 		id: 22
// 	},
// 	{
// 		name: 'COMPTON',
// 		id: 23
// 	},
// 	{
// 		name: 'ALHAMBRA',
// 		id: 24
// 	},
// 	{
// 		name: 'ARCADIA',
// 		id: 25
// 	},
// 	{
// 		name: 'EL MONTE',
// 		id: 26
// 	},
// 	{
// 		name: 'DOWNEY',
// 		id: 27
// 	},
// 	{
// 		name: 'NORWALK',
// 		id: 28
// 	},
// 	{
// 		name: 'LONG BEACH',
// 		id: 29
// 	},
// 	{
// 		name: 'WEST COVINA',
// 		id: 30
// 	},
// 	{
// 		name: 'WEST COVINA',
// 		id: 31
// 	},
// 	{
// 		name: 'EL MONTE',
// 		id: 32
// 	},
// 	{
// 		name: 'ALHAMBRA',
// 		id: 33
// 	}
// ]

// const DialogAddUser = (props) => {

//     const { show, setShow, business_id } = props

//   const [addressType, setAddressType] = useState('home')

//   const bgColors = useBgColor()

//   	const validationSchema = Yup.object().shape({
// 		first_name: Yup.string()
//     		.required('First name is required')
//             .min(2, 'First name must contain at least 2 characters')
//             .max(16, 'First name can not have more than 16 characters'),
// 		last_name: Yup.string()
//     		.required('Last name is required')
//             .min(2, 'Last name must contain at least 2 characters')
//             .max(16, 'Last name can not have more than 16 characters'),
// 		email: Yup.string()
//     		.required('Last name is required')
// 			.email('Email is invalid'),
// 		phone_number: Yup.string()
//     		.required('Phone number is required')
//             .min(8, 'Phone number must contain at least 8 characters')
//             .max(16, 'Phone number can not have more than 16 characters'),
// 	})

//   	const formik = useFormik({
// 		initialValues: {
// 			first_name: '',
// 			last_name: '',
// 			email: '',
// 			phone_number: '',
			
// 		},
// 		validationSchema,
// 		onSubmit: values => submitData(values),
// 	});

// 	const submitData = async (values) => {
//         try {	
// 			await userService.create({
// 				first_name: values.first_name,
// 				last_name: values.last_name,
// 				email: values.email,
// 				phone_number: values.phone_number,
// 				business_id: business_id
// 			})
// 			setShow(false)
// 			formik.resetForm()
// 			return true
// 		} catch (er) {
// 			er.errors.map(x =>{
//                 formik.setFieldError(x.path[0], x.message)
// 				toast.error(x.message)
//             })
// 			return true
// 		}
//     }



//   return (
//       <Dialog
//         fullWidth
//         open={show}
//         maxWidth='md'
//         scroll='body'
//         onClose={() => setShow(false)}
//         TransitionComponent={Transition}
//         onBackdropClick={() => setShow(false)}
//       >
// 		<form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
//         <DialogContent
//           sx={{
//             position: 'relative',
//             pb: theme => `${theme.spacing(8)} !important`,
//             px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
//             pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
//           }}
//         >
//           <IconButton
//             size='small'
//             onClick={() => setShow(false)}
//             sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
//           >
//             <Icon icon='mdi:close' />
//           </IconButton>
//           <Box sx={{ mb: 9, textAlign: 'center' }}>
//             <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
//               Add New Business
//             </Typography>
//             {/* <Typography variant='body2'>Add address for billing address</Typography> */}
//           </Box>
//           <Grid container spacing={6}>
//             {console.log(formik.values)}
//             <Grid item sm={6} xs={12}>
//               	<TextField 
// 			  		fullWidth 
// 					label='User First Name' 
// 					placeholder='John' 
//                 	id='first_name' 
//                 	name='first_name'
//                 	type='text'
//                 	onChange={formik.handleChange}
//                 	value={formik.values.first_name}
//                 	error={formik.touched.first_name && Boolean(formik.errors['first_name'])}
//                 	disabled={formik.isSubmitting}
// 				/>
// 				{
// 					formik.touched.first_name && formik.errors.first_name && (
// 						<FormHelperText 
// 							sx={{ color: 'error.main' }}
// 						>
// 							{formik.errors.first_name}
// 						</FormHelperText>
// 					)
// 				}												
//             </Grid>
//             <Grid item sm={6} xs={12}>
//               	<TextField 
// 			  		fullWidth 
// 					label='User Last Name' 
// 					placeholder='Doe' 
//                 	id='last_name' 
//                 	name='last_name'
//                 	type='text'
//                 	onChange={formik.handleChange}
//                 	value={formik.values.last_name}
//                 	error={formik.touched.last_name && Boolean(formik.errors['last_name'])}
//                 	disabled={formik.isSubmitting}
// 				/>
// 				{
// 					formik.touched.last_name && formik.errors.last_name && (
// 						<FormHelperText 
// 							sx={{ color: 'error.main' }}
// 						>
// 							{formik.errors.last_name}
// 						</FormHelperText>
// 					)
// 				}												
//             </Grid>
// 			<Grid item sm={6} xs={12}>
//               	<TextField 
// 			  		fullWidth 
// 					label='User Email Address' 
// 					placeholder='example@mail.com' 
//                 	id='email' 
//                 	name='email'
//                 	type='email'
//                 	onChange={formik.handleChange}
//                 	value={formik.values.email}
//                 	error={formik.touched.email && Boolean(formik.errors['email'])}
//                 	disabled={formik.isSubmitting}
// 				/>
// 				{
// 					formik.touched.email && formik.errors.email && (
// 						<FormHelperText 
// 							sx={{ color: 'error.main' }}
// 						>
// 							{formik.errors.email}
// 						</FormHelperText>
// 					)
// 				}												
//             </Grid>
// 			<Grid item sm={6} xs={12}>
// 			<InputMask
//                     mask="999 999 99 99"
//                     value={formik.values.phone_number}
//                     onChange={formik.handleChange}
//                     maskChar=" "
// 					name='phone_number'
//                   >

//                     {
//                       ()=>
//               			<TextField 
// 			  				fullWidth 
// 							label='User Telephone' 
// 							placeholder='202 555 0111'
//                 			name='phone_number'
//                 			error={formik.touched.phone_number && Boolean(formik.errors['phone_number'])}
// 							InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
// 						/>
// 					}
// 			</InputMask>
// 				{
// 					formik.touched.phone_number && formik.errors.phone_number && (
// 						<FormHelperText 
// 							sx={{ color: 'error.main' }}
// 						>
// 							{formik.errors.phone_number}
// 						</FormHelperText>
// 					)
// 				}												
//             </Grid>
			
			

//           </Grid>
//         </DialogContent>
//         <DialogActions
//           sx={{
//             justifyContent: 'center',
//             px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
//             pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
//           }}
//         >
          
//           <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
//             Cancel
//           </Button>
// 		  <Button variant='contained' type='submit' sx={{ mr: 2 }} disabled={formik.isSubmitting}>
// 		  		{
//                   	formik.isSubmitting && <CircularProgress
//                     	size={24}
//                     	sx={{
//                     	  color: green[500],
//                     	  position: 'absolute',
//                     	  top: '50%',
//                     	  left: '50%',
//                     	  marginTop: '-12px',
//                     	  marginLeft: '-12px',
//                     	}}
//                   	/>
//                 }
//                  Submit
//           </Button>
//         </DialogActions>
// 		</form>
//       </Dialog>
//   )
// }

// export default DialogAddUser
