// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import toast from 'react-hot-toast'
import InputAdornment from '@mui/material/InputAdornment'
import * as Yup from 'yup';
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'
import { useFormik } from 'formik'
import { Alert, CircularProgress, Snackbar } from '@mui/material'
import { green } from '@mui/material/colors'
import { authService } from 'services/auth.service'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
	[theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ResetPasswordV1 = () => {
	// ** States
	const [values, setValues] = useState({
		showNewPassword: false,
	})

	// ** Hook
	const theme = useTheme()

	// Handle New Password
	

	const handleClickShowNewPassword = () => {
		setValues({ ...values, showNewPassword: !values.showNewPassword })
	}

    const validationSchema = Yup.object().shape({
		new_password: Yup.string()
    		.required('New password is required')
            .min(6, 'Password must contain at least 6 characters')
            .max(24, 'Password can not have more than 24 characters'),
	})

	const formik = useFormik({
		initialValues: {
			new_password: '',
		},
		validationSchema,
		onSubmit: values => submitData(values),
	});

    const [ sent, setSent ] = useState(false)


    const submitData = async values => {
 
        try {
            const params = new URLSearchParams(window.location.search);
            let token = params.get('token')
            let payload = {
                token,
                new_password: values.new_password,
            }
            await authService.resetPassword(payload)
            toast.success('Password changed... redirecting to login in 3 seconds...')
            setSent(true)
            setTimeout(() => {
                window.location.replace('/')
            }, 3000)
        } catch (er) {
            console.log(er)
            er.errors && Array.isArray(er.errors) && er.errors.map(x => {
                if(x.path){
                    x.path.map(y => 
                        {
                            if(y === 'token'){
                                toast.error(x.message.replaceAll('"', ''))
                            } else {
                                setError(y, {
                                    message: x.message
                                })
                            }
                        }
                    )
                } else {
                    toast.error(x.message)
                }
            })
            return true
        }
      }

	

	return (
		<Box className='content-center'>
			<Card sx={{ zIndex: 1 }}>
				<CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
					<Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
							{themeConfig.templateName}
						</Typography>
					</Box>{console.log(formik.errors)}{console.log(formik.values)}
                    {
                        !sent && <Box sx={{ mb: 6, textAlign: 'center' }}>
					    	<Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
					    		Reset Password
					    	</Typography>
					    	<Typography variant='body2'>Set your new password below</Typography>
					    </Box>
                    }
                    {
                        sent ? (
                            <Box sx={{ mb: 6.5, textAlign:'center' }}>
								<img src='/images/correct.svg' alt='correct' style={{width:'30%'}}/>
								<h5>Your new password is set!</h5>
								<strong><h4>You can login now</h4></strong>
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
                            <form noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
					        	<FormControl fullWidth sx={{ mb: 4 }}>
					        		<InputLabel htmlFor='auth-reset-password-new-password'>New Password</InputLabel>
					        		<OutlinedInput
					        			autoFocus
					        			label='New Password'
                                        name={'new_password'}
					        			value={formik.values.new_password}
                                        disabled={formik.isSubmitting}
					        			id='new_password'
					        			onChange={formik.handleChange}
					        			type={values.showNewPassword ? 'text' : 'password'}
                                        error={formik.touched.new_password && Boolean(formik.errors['new_password'])}
					        			endAdornment={
					        				<InputAdornment position='end'>
					        					<IconButton
					        						edge='end'
					        						onClick={handleClickShowNewPassword}
					        						onMouseDown={e => e.preventDefault()}
					        						aria-label='toggle password visibility'
					        					>
					        						<Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
					        					</IconButton>
					        				</InputAdornment>
					        			}
					        		/>
					        	</FormControl>
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
                                    Set New Password
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
                        )
                    }
					
				</CardContent>
			</Card>
			{/* <FooterIllustrationsV1 image={`/images/pages/auth-v1-reset-password-mask-${theme.palette.mode}.png`} /> */}
		</Box>
	)
}
ResetPasswordV1.getLayout = page => <BlankLayout>{page}</BlankLayout>
ResetPasswordV1.guestGuard = true
export default ResetPasswordV1
