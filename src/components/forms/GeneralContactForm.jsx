import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//позволяет отображать уведомления
import { useSnackbar } from "notistack";
//helpers
import { createMessage } from "../../helpers/api/api-messages";

// material
import { Card, Stack, TextField, Typography } from "@mui/material";
import { MotionInView, varFadeIn } from "../animate";
import { LoadingButton } from "@mui/lab";
import { MIconButton } from "../@material-extend";
//icons
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";

// ----------------------------------------------------------------------

export default function GeneralContactForm({ onCloseModalHandler }) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	// валидация с помощью пакета Yup
	const ContactSchema = Yup.object().shape({
		name: Yup.string().required("* обязательное поле"),
		email: Yup.string()
			.required("* обязательное поле")
			.email("* aдрес должен иметь формат post@post.com"),
		message: Yup.string()
			.min(6, "Длина сообщения не менее 6 знаков")
			.max(1000, "Длина сообщения не более 1000 знаков")
			.required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			message: "",
			request: "",
		},
		validationSchema: ContactSchema,
		onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
			try {
				//создает новой сообщение и записывает в базу данных
				const response = await createMessage({
					subject: "Обратная связь",
					request: "feedback",
					message: values.message,
					userName: values.name,
					userEmail: values.email,
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
					setErrors({
						afterSubmit:
							response.message ||
							"Error: [/components/forms/GeneralContactForm.js] createMessage()",
					});
					return;
				}

				enqueueSnackbar("УСПЕШНО! Мы ответим вам в ближайшее время", {
					variant: "success",
					action: (key) => (
						<MIconButton size="small" onClick={() => closeSnackbar(key)}>
							<Icon icon={closeFill} />
						</MIconButton>
					),
				});

				onCloseModalHandler();
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
					<Stack spacing={5}>
						<Typography
							variant="h6"
							sx={{ textAlign: { xs: "center", md: "left" } }}
						>
							Напишите нам, если у вас появились вопросы
						</Typography>

						<TextField
							fullWidth
							label="Имя"
							{...getFieldProps("name")}
							error={Boolean(touched.name && errors.name)}
							helperText={touched.name && errors.name}
						/>

						<TextField
							fullWidth
							label="Электронная почта"
							{...getFieldProps("email")}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>

						<TextField
							fullWidth
							label="Cообщение"
							{...getFieldProps("message")}
							multiline
							rows={4}
							error={Boolean(touched.message && errors.message)}
							helperText={touched.message && errors.message}
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
				</MotionInView>
			</Form>
		</FormikProvider>
	);
}
