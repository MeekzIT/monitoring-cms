import { Visibility, VisibilityOff } from "@mui/icons-material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { IconButton, InputAdornment } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Form, Formik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import * as Yup from "yup"
import Error from "../../components/error/Error"

import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "../../components/languageSwitcher/LanguageSwitcher"
import { loginAction } from "../../store/actions/auth-action"
import "./login.css"

const LoginPage = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const validationSchema = Yup.object().shape({
		email: Yup.string().email(t("invalid-email")).required(t("required")),
		password: Yup.string().min(8, t("too-short")).required(t("required")),
	})
	const [showPassword, setShowPassword] = useState(false)
	const handleTogglePassword = () => {
		setShowPassword(!showPassword)
	}
	return (
		<div className='login-box'>
			<Container component='main' maxWidth='xs' className='login'>
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{t("sign-in")}
					</Typography>

					<Box
						sx={{
							mt: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={validationSchema}
							onSubmit={values => {
								dispatch(loginAction(values))
							}}
						>
							{({ values, errors, handleChange, handleBlur, handleSubmit }) => (
								<Form onSubmit={handleSubmit}>
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<LanguageSwitcher />
										<TextField
											margin='normal'
											required
											fullWidth
											label={t("email")}
											autoComplete='email'
											name='email'
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
										/>
										<Error message={errors.email} />
										<TextField
											margin='normal'
											required
											fullWidth
											autoComplete='current-password'
											label={t("password")}
											id='password'
											name='password'
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											type={showPassword ? "text" : "password"}
											InputProps={{
												endAdornment: (
													<InputAdornment position='end'>
														<IconButton onClick={handleTogglePassword}>
															{showPassword ? (
																<Visibility sx={{ color: "primary.main" }} />
															) : (
																<VisibilityOff sx={{ color: "primary.main" }} />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										<Error message={errors.password} /> <br />
										<Button
											type='submit'
											fullWidth
											variant='contained'
											sx={{ mt: 3, mb: 2, color: "white" }}
										>
											{t("sign-in")}
										</Button>
									</Box>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Container>
		</div>
	)
}

export default LoginPage
