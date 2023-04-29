import { useState } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Alert, CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'
import { useAuth } from 'src/hooks/useAuth'

const Card = styled(MuiCard)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: { width: 450 }
}))

const LoginPage = () => {

	const [values, setValues] = useState({
		showPassword: false
	})

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword })
	}

    const validationSchema = Yup.object().shape({
        email: Yup.string()
    		.required('Email is required'),
		password: Yup.string()
    		.required('New password is required')
            .min(6, 'Password must contain at least 6 characters')
            .max(24, 'Password can not have more than 24 characters'),
	})

    const auth = useAuth()

    const formik = useFormik({
		initialValues: {
			email: '',
            password: ''
		},
		validationSchema,
		onSubmit: values => submitData(values),
	});

    const [ error, setError ] = useState('')

    const [ isLoading, setIsLoading ] = useState(false)

    const submitData = async (values) => {
        setIsLoading(true)
        const { email, password } = values
        auth.login({ email, password }, (err) => {
            if(err.code === 401){
                setError('Your email or password is incorrect')
            } else {
                setError('Something went wrong. Contact support.')
            }
            setIsLoading(false)
        })
    }

	return (
		<Box className='content-center'>
			<Card sx={{ zIndex: 1 }}>
				<CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
					<Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						
						<Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
							{themeConfig.templateName}
						</Typography>
					</Box>
					<Box sx={{ mb: 6, textAlign: 'center' }}>
						<Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px' }}>
							{`Welcome to ${themeConfig.templateName}!`}
						</Typography>
						<Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
					</Box>
                    { error && <Alert severity="error" sx={{mb:4}}>{error}</Alert> }
					<form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
						<TextField 
                            autoFocus 
                            fullWidth 
                            id='email' 
                            label='Email' 
                            sx={{ mb: 4 }} 
                            name='email'
                            type='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors['email'])}
                            disabled={isLoading}
                        />
						<FormControl fullWidth>
							<InputLabel htmlFor='auth-login-password'>Password</InputLabel>
							<OutlinedInput
								label='Password'
								value={formik.values.password}
                                name='password'
								id='auth-login-password'
								onChange={formik.handleChange}
								type={values.showPassword ? 'text' : 'password'}
                                error={formik.touched.password && Boolean(formik.errors['password'])}
                                disabled={isLoading}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											edge='end'
											onClick={handleClickShowPassword}
											onMouseDown={e => e.preventDefault()}
											aria-label='toggle password visibility'
										>
											<Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<Box
							sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
						>
							<div></div>
							<Typography
								variant='body2'
								component={Link}
								href='/forgot-password'
								sx={{ color: 'primary.main', textDecoration: 'none', mt:'16px' }}
							>
								Forgot Password?
							</Typography>
						</Box>
						<Button disabled={isLoading} fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                            {
                                isLoading && <CircularProgress
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
							Login
						</Button>
						<Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
							<Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography>
							<Typography
								component={Link}
								href='/register'
								sx={{ color: 'primary.main', textDecoration: 'none' }}
							>
								Create an account
							</Typography>
						</Box>
					</form>
				</CardContent>
			</Card>
			{/* <FooterIllustrationsV1 /> */}
		</Box>
	)
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
LoginPage.guestGuard = true

export default LoginPage
