import Link from 'next/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { authService } from 'services/auth.service'
import { Alert, CircularProgress, FormControl, FormHelperText, Snackbar } from '@mui/material'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { green } from '@mui/material/colors'
import { useState } from 'react'
const Card = styled(MuiCard)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: { width: 450 }
}))

const ForgotPassword = () => {

	const [ error, setError ] = useState('')

	const [ sent, setSent ] = useState(false)

	const [ snackbar, setSnackbar ] = useState({open:false})

	const validationSchema = Yup.object().shape({
		email: Yup.string()
    		.email('Email is invalid')
    		.required('Email is required'),
	})

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema,
		onSubmit: values => onSubmit(values),
	});

	

	const onSubmit = async (data) => {
		try {
			setError('')
			await authService.forgotPassword(data)
			setSent(true)
			setSnackbar({
				open: true,
				severity: 'success',
				message: 'Reset link sent'
			})
			return true
		} catch (er) {
			if(er.errors.length > 0){
				setError(er.errors[0]['message'])
				setSnackbar({
					open: true,
					severity: 'error',
					message: 'There was an issue sending the reset link'
				})
			}
			return true
		}
	}

	const theme = useTheme()
	return (
		<Box className='content-center'>
			<Snackbar
      		  	open={snackbar.open}
      		  	onClose={()=>setSnackbar({open:false, severity: snackbar.severity})}
      		  	autoHideDuration={3000}
      		  	TransitionProps={{ onExited: ()=>setSnackbar({open:false, severity: snackbar.severity}) }}
      		  	key={undefined}
      		  	message={snackbar.message}
      		>
      		  	<Alert
      		  	  	elevation={3}
      		  	  	variant='filled'
      		  	  	onClose={()=>setSnackbar({open:false, severity: snackbar.severity})}
      		  	  	severity={snackbar.severity}
      		  	>
      		    	{snackbar.message}
      		  	</Alert>
      		</Snackbar>
			<Card sx={{ zIndex: 1 }}>
			
				<CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
					<Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
							{themeConfig.templateName}
						</Typography>
					</Box>
					{
						sent ? (
							<Box sx={{ mb: 6.5, textAlign:'center' }}>
								<img src='/images/correct.svg' alt='correct' style={{width:'30%'}}/>
								<h5>If your email exists in our database, you will receive an email with the steps to reset your password</h5>
								<strong><h4>Check your inbox</h4></strong>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<Typography
											component={Link}
											href='/login'
											sx={{
												display: 'flex',
												'& svg': { mr: 1.5 },
												alignItems: 'center',
												color: 'primary.main',
												textDecoration: 'none',
												justifyContent: 'center'
											}}
										>
											<Icon icon='mdi:chevron-left' fontSize='2rem' />
											<span>Back to login</span>
										</Typography>
									</Box>
							</Box>
						) : (
							<>
								<Box sx={{ mb: 6.5, textAlign: 'center' }}>
									<Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
										Forgot Password?
									</Typography>
									<Typography variant='body2'>
										Enter your email and we&prime;ll send you instructions to reset your password
									</Typography>
								</Box>
								<form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
									<FormControl fullWidth sx={{mb:4}}>
										<TextField 
											autoFocus 
											type='email' 
											label='Email' 
											name='email'
											disabled={formik.isSubmitting}
											sx={{ display: 'flex', mb: 2 }}
											onChange={formik.handleChange}
											value={formik.values.email} 
											error={formik.touched.email && Boolean(formik.errors['email'])}
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

									</FormControl>
									{ error && <Alert severity="error" sx={{mb:4}}>{error}</Alert> }
									<Button disabled={formik.isSubmitting} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
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
                						Send Reset Link
									</Button>
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<Typography
											component={Link}
											href='/login'
											sx={{
												display: 'flex',
												'& svg': { mr: 1.5 },
												alignItems: 'center',
												color: 'primary.main',
												textDecoration: 'none',
												justifyContent: 'center'
											}}
										>
											<Icon icon='mdi:chevron-left' fontSize='2rem' />
											<span>Back to login</span>
										</Typography>
									</Box>
								</form>
							</>
						)
					}
				</CardContent>
			</Card>
		</Box>
	)
}
ForgotPassword.guestGuard = true
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
