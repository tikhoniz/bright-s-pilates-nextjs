import React from "react";
// Yup
import * as Yup from "yup";
// formik
import { useFormik, Form, FormikProvider } from "formik";
// notification
import { useSnackbar } from "notistack";
// utils
import { createMessage } from "../../helpers/api/api-messages";
// material
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MIconButton } from "../@material-extend";
//icons
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";

// animation
import { MotionInView, varFadeIn } from "../animate";
import NewMessageIcon from "../icons/icon_new_message";
import WhatsAppIcon from "../icons/social/whats_app";
import TelegramIcon from "../icons/social/telegram_app";
import useUser from "../../hooks/useUser";

// ----------------------------------------------------------------------

export default function EnrollmentPersonalForm({ onClose, coach }) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { user } = useUser();

	// валидация с помощью пакета Yup
	const ContactSchema = Yup.object().shape({
		name: Yup.string().required("* обязательное поле"),
		email: Yup.string().email("* aдрес должен иметь формат email@email.com"),
		//.required("* обязательное поле"),
		whatsappNumber: Yup.string()
			.matches(/^(\+?)[0-9]+$/, "* только цифры")
			.min(7, "7 цифр минимум")
			.max(30, "30 цифр максимум"),

		telegramAccount: Yup.string()
			.min(2, "2 знака минимум")
			.max(30, "30 знаков максимум"),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: user?.name || "",
			email: user?.email || "",
			message: "",
			whatsappNumber: "",
			telegramAccount: "",
			request: "",
		},
		validationSchema: ContactSchema,
		onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
			try {
				//создает новой сообщение и записывает в базу данных
				const response = await createMessage({
					request: "personal",
					subject: "Заявка на персональную тренировку",
					coach: coach,
					userEmail: user?.email || values.email,
					whatsappNumber: values.whatsappNumber,
					telegramAccount: values.telegramAccount,
					message: values.message,
					userName: user?.name || values.name,
				});

				if (!response.ok) {
					enqueueSnackbar(response.message, {
						variant: "error",
						action: (key) => (
							<MIconButton size="small" onClick={() => closeSnackbar(key)}>
								<Icon icon={closeFill} />
							</MIconButton>
						),
					});
					//resetForm();
					setErrors({
						afterSubmit:
							response.message ||
							"Error: [/components/forms/EnrollmentPersonalForm.js] createMessage()",
					});
					return;
				}

				enqueueSnackbar("УСПЕШНО! Мы свяжемся с Вами в ближайшее время.", {
					variant: "success",
					action: (key) => (
						<MIconButton size="small" onClick={() => closeSnackbar(key)}>
							<Icon icon={closeFill} />
						</MIconButton>
					),
				});

				onClose();
				resetForm();
				setSubmitting(false);
			} catch (error) {
				console.error(error);

				setSubmitting(false);
				setErrors({ afterSubmit: error.message });
			}
		},
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
		formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<MotionInView variants={varFadeIn}>
					<Stack spacing={4} sx={{ my: 5, mx: { xs: 1, sm: 5 } }}>
						<TextField
							fullWidth
							label="Имя"
							{...getFieldProps("name")}
							error={Boolean(touched.name && errors.name)}
							helperText={touched.name && errors.name}
						/>

						<Stack spacing={2}>
							<Typography variant="h4" align="center">
								Укажите удобный вид обратной связи
							</Typography>

							<TextField
								fullWidth
								label="Электронная почта"
								{...getFieldProps("email")}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<NewMessageIcon width={24} height={24} color="#51c5cf" />
										</InputAdornment>
									),
								}}
								error={Boolean(touched.email && errors.email)}
								helperText={touched.email && errors.email}
								placeholder=" email@email.com"
							/>

							<TextField
								fullWidth
								label="Whats App"
								{...getFieldProps("whatsappNumber")}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<WhatsAppIcon width={24} height={24} />
										</InputAdornment>
									),
								}}
								placeholder=" +123456789"
								error={Boolean(touched.whatsappNumber && errors.whatsappNumber)}
								helperText={touched.whatsappNumber && errors.whatsappNumber}
							/>

							<TextField
								fullWidth
								label="Telegram"
								{...getFieldProps("telegramAccount")}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<TelegramIcon width={24} height={24} />
										</InputAdornment>
									),
								}}
								placeholder=" @account"
								error={Boolean(
									touched.telegramAccount && errors.telegramAccount
								)}
								helperText={touched.telegramAccount && errors.telegramAccount}
							/>

							<TextField
								fullWidth
								label="Свой вариант"
								{...getFieldProps("message")}
								multiline
								rows={2}
								error={Boolean(touched.message && errors.message)}
								helperText={touched.message && errors.message}
							/>
						</Stack>

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
				</MotionInView>
			</Form>
		</FormikProvider>
	);
}
