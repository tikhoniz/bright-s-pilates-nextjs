import { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
// notification
import { Form, FormikProvider, useFormik } from "formik";
// hooks
import useLocales from "../../hooks/useLocales";
import useIsMountedRef from "../../hooks/useIsMountedRef";
// utils
import { resetPassword } from "../../helpers/api/api-users";
// material
import {
	Box,
	Alert,
	Stack,
	Button,
	TextField,
	Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// icons
import SentIcon from "../icons/icon_sent";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
	onSent: PropTypes.func,
	onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ setResetHandler }) {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const isMountedRef = useIsMountedRef();

	const { currentLang } = useLocales();

	const ResetPasswordSchema = Yup.object().shape({
		email: Yup.string()
			.email(
				"* адрес электронной почты должен соответствовать формату email@post.com"
			)
			.required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: ResetPasswordSchema,
		onSubmit: async (values, { setErrors, setSubmitting }) => {
			try {
				const { email, message } = await resetPassword(
					values.email,
					currentLang.value
				);

				if (email && !message) {
					if (isMountedRef.current) {
						setSent(true);
						//onGetEmail(formik.values.email);
						setEmail(email);
						setSubmitting(false);
					}
				} else {
					setErrors({ afterSubmit: message });
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
		<Box sx={{ overflow: "hidden" }}>
			{!sent ? (
				<>
					<Typography variant="h3" paragraph>
						Забыли свой пароль?
					</Typography>
					<Typography
						sx={{ color: "text.secondary", mb: 5, textAlign: "justify" }}
					>
						Ничего страшного! Просто введите свою почту, на которую был
						зарегистрирован аккаунт, и мы отправим ссылку на изменение пароля.
					</Typography>

					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={3}>
								{errors.afterSubmit && (
									<Alert severity="error">{errors.afterSubmit}</Alert>
								)}

								<TextField
									fullWidth
									autoComplete="username"
									{...getFieldProps("email")}
									type="email"
									label="Email"
									error={Boolean(touched.email && errors.email)}
									helperText={touched.email && errors.email}
								/>

								<LoadingButton
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									loading={isSubmitting}
								>
									Отправить
								</LoadingButton>
							</Stack>
						</Form>
					</FormikProvider>

					<Button
						fullWidth
						size="large"
						onClick={() => setResetHandler(false)}
						sx={{ mt: 1 }}
					>
						Назад
					</Button>
				</>
			) : (
				<Box sx={{ textAlign: "center" }}>
					<SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />

					<Typography variant="h3" gutterBottom>
						Успешно!
					</Typography>
					<Typography>
						Мы отправили ссылку на восстановление пароля на &nbsp;
						<strong>{email}</strong>
						<br />
						Пожалуйста, проверьте свой почтовый ящик. !
						<br />
						Если письмо со ссылкой не пришло в течении 5 минут, проверьте папку
						"СПАМ" !
					</Typography>

					<Button
						size="large"
						variant="contained"
						onClick={() => {
							setSent(false);
							setResetHandler(false);
						}}
						sx={{ mt: 5 }}
					>
						OK
					</Button>
				</Box>
			)}
		</Box>
	);
}
