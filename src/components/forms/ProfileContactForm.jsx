import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
//позволяет отображать уведомления
import { useSnackbar } from "notistack";
//helpers
import { createMessage } from "../../helpers/api/api-messages";
// material
import { Card, CardContent, CardHeader, Stack, TextField } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { MotionInView, varFadeIn, varFadeInRight } from "../animate";
import { LoadingButton } from "@mui/lab";
import { MIconButton } from "../@material-extend";
//icons
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import useUser from "../../hooks/useUser";
import { mutate } from "swr";

// ----------------------------------------------------------------------

export default function ProfileContactForm() {
	const { user, isLoading, isError } = useUser();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	const { _id: userId, email, name } = user;

	// валидация с помощью пакета Yup
	const ContactSchema = Yup.object().shape({
		subject: Yup.string().required("Напишите тему сообщения"),
		message: Yup.string().required("Длина сообщения не менее 1 знака"),
	});

	const formik = useFormik({
		initialValues: {
			subject: "",
			message: "",
			request: "",
		},
		validationSchema: ContactSchema,
		onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
			try {
				//создает новой сообщение и записывает в базу данных
				const response = await createMessage({
					subject: values.subject,
					message: values.message,
					userId: userId,
					userName: name,
					userEmail: email,
					request: "profile",
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
							"Error: [/components/forms/ProfileContactForm.js] createMessage()",
					});
					return;
				}

				enqueueSnackbar(
					"Сообщение успешно отправлено! Вам ответят в ближайшее время.",
					{
						variant: "success",
						autoHideDuration: 3000,
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "right",
						},
						action: (key) => (
							<MIconButton size="small" onClick={() => closeSnackbar(key)}>
								<Icon icon={closeFill} />
							</MIconButton>
						),
					}
				);

				mutate(`/api/messages/${email}`);

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
		<MotionInView variants={varFadeIn}>
			<Card>
				<CardHeader
					title="Напишите нам! "
					subheader="Мы будем рады услышать Ваши предложения, вопросы или
					замечания."
				/>
				<CardContent>
					<FormikProvider value={formik}>
						<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
							<Stack spacing={5}>
								<TextField
									fullWidth
									label="Тема"
									{...getFieldProps("subject")}
									error={Boolean(touched.subject && errors.subject)}
									helperText={touched.subject && errors.subject}
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
						</Form>
					</FormikProvider>
				</CardContent>
			</Card>
		</MotionInView>
	);
}
