import { useState } from "react";

import * as Yup from "yup";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
	Box,
	Alert,
	Stack,
	Button,
	TextField,
	IconButton,
	Typography,
	InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";
// hooks
import useIsMountedRef from "../../hooks/useIsMountedRef";
// utils
import { setNewPassword } from "../../helpers/api/api-users";
// components
import Page from "../Page";
// icons
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import SentIcon from "../icons/icon_sent";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	//* добавляеются изменения при изменении экрана
	[theme.breakpoints.down("md")]: {
		margin: 10,
	},
}));

const ContentStyle = styled("div")(({ theme }) => ({
	position: "relative",
	maxWidth: 480,
	margin: "auto",
	display: "flex",
	minHeight: "100%",
	flexDirection: "column",
	justifyContent: "center",
	padding: theme.spacing(23, 0),
}));

// ----------------------------------------------------------------------

NewPasswordForm.propTypes = {
	onSent: PropTypes.func,
	onGetEmail: PropTypes.func,
};

function NewPasswordForm({ token, router }) {
	const [showPassword, setShowPassword] = useState(false);
	const [sent, setSent] = useState(false);

	const isMountedRef = useIsMountedRef();

	const ResetPasswordSchema = Yup.object().shape({
		password: Yup.string().required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			password: "",
		},
		validationSchema: ResetPasswordSchema,
		onSubmit: async (values, { setErrors, setSubmitting }) => {
			try {
				const response = await setNewPassword(values.password, token);

				if (response.ok) {
					if (isMountedRef.current) {
						setSent(true);
						setSubmitting(false);
					}
				} else {
					setErrors({ afterSubmit: response.message });
					setSubmitting(false);
				}
			} catch (error) {
				console.error(error);
				if (isMountedRef.current) {
					setErrors({ afterSubmit: error.message });
					setSubmitting(false);
				}
			}
		},
	});

	const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

	return (
		<RootStyle title="Изменение пароля | Bright's Pilates Studio">
			<ContentStyle>
				<Box sx={{ maxWidth: 480, mx: "auto" }}>
					{!sent && (
						<>
							<Typography variant="h3" paragraph>
								Введите новый пароль
							</Typography>
							<Typography sx={{ color: "text.secondary", mb: 5 }}>
								Желательно, чтобы пароль был не супер простой и содержал не
								менее 5 знаков
							</Typography>

							<FormikProvider value={formik}>
								<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
									<Stack spacing={3}>
										{errors.afterSubmit && (
											<Alert severity="error">{errors.afterSubmit}</Alert>
										)}

										<TextField
											fullWidth
											autoComplete="current-password"
											type={showPassword ? "text" : "password"}
											label="Пароль"
											{...getFieldProps("password")}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															onClick={() => setShowPassword((prev) => !prev)}
															edge="end"
														>
															<Icon
																icon={showPassword ? eyeFill : eyeOffFill}
															/>
															<Icon />
														</IconButton>
													</InputAdornment>
												),
											}}
											error={Boolean(touched.password && errors.password)}
											helperText={touched.password && errors.password}
										/>

										<LoadingButton
											fullWidth
											size="large"
											type="submit"
											variant="contained"
											loading={isSubmitting}
										>
											Изменить
										</LoadingButton>
									</Stack>
								</Form>
							</FormikProvider>
						</>
					)}

					{sent && (
						<Box sx={{ textAlign: "center" }}>
							<SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />

							<Typography variant="h3" gutterBottom>
								Поздравляем! <br /> Новый пароль установлен.
							</Typography>
							<Typography>
								Теперь Вы можете войти в свой аккаунт использую новый пароль
							</Typography>

							<Button
								size="large"
								variant="contained"
								onClick={() => {
									router.push("/auth");
								}}
								sx={{ mt: 5 }}
							>
								Вход
							</Button>
						</Box>
					)}
				</Box>
			</ContentStyle>
		</RootStyle>
	);
}

export default NewPasswordForm;
