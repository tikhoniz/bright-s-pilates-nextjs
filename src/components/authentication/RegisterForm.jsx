import * as Yup from "yup";
import { useState } from "react";
// next
import NextLink from "next/link";
import { signIn } from "next-auth/react"; // notification
import { useSnackbar } from "notistack";
import { useFormik, Form, FormikProvider } from "formik";
// utils
import { createUser } from "../../helpers/api/api-users";
// material
import {
	Stack,
	TextField,
	IconButton,
	InputAdornment,
	Alert,
	Box,
	Typography,
	Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { MIconButton } from "../@material-extend";
// hooks
import useIsMountedRef from "../../hooks/useIsMountedRef";
//icons
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import closeFill from "@iconify/icons-eva/close-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function RegisterForm({ router, isVerified }) {
	const isMountedRef = useIsMountedRef();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [showPassword, setShowPassword] = useState(false);

	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, "Слишком короткое имя!")
			.max(50, "Слишком длинное имя!")
			.required("* обязательное поле"),
		lastName: Yup.string()
			.min(1, "Слишком короткая фамилия!")
			.max(50, "Слишком длинная фамилия!"),
		email: Yup.string()
			.email(
				"* адрес электронной почты должен соответствовать формату email@post.com"
			)
			.required("* обязательное поле"),
		password: Yup.string().required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		validationSchema: RegisterSchema,
		onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
			try {
				const response = await createUser({
					name: values.firstName,
					lastName: values.lastName,
					email: values.email,
					image: { url: null, id: null },
					password: values.password,
					regType: "credentials",
				});

				if (!response.ok) {
					resetForm();
					setErrors({ afterSubmit: response.message });
					return;
				}

				enqueueSnackbar("Аккаунт успешно зарегистрирован.", {
					variant: "success",
					action: (key) => (
						<MIconButton size="small" onClick={() => closeSnackbar(key)}>
							<Icon icon={closeFill} />
						</MIconButton>
					),
				});

				//если юзер создан осуществляется вход
				const res = await signIn("credentials", {
					redirect: false,
					email: values.email,
					password: values.password,
				});

				if (!res.ok) {
					setErrors({ afterSubmit: res.message });
					return;
				}

				router.push("/");
			} catch (error) {
				console.error(error);
				if (isMountedRef.current) {
					setErrors({ afterSubmit: error.message });
					setSubmitting(false);
				}
			}
		},
	});

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					{errors.afterSubmit && (
						<Alert severity="error">{errors.afterSubmit}</Alert>
					)}

					<Box sx={{ flexGrow: 1 }}>
						<Typography sx={{ color: "text.secondary" }}>
							* фамилию указывать не обязательно
						</Typography>
					</Box>

					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<TextField
							fullWidth
							label="Имя"
							{...getFieldProps("firstName")}
							error={Boolean(touched.firstName && errors.firstName)}
							helperText={touched.firstName && errors.firstName}
						/>

						<TextField
							fullWidth
							label="Фамилия"
							{...getFieldProps("lastName")}
							error={Boolean(touched.lastName && errors.lastName)}
							helperText={touched.lastName && errors.lastName}
						/>
					</Stack>

					<TextField
						fullWidth
						autoComplete="username"
						type="email"
						label="Email"
						{...getFieldProps("email")}
						error={Boolean(touched.email && errors.email)}
						helperText={touched.email && errors.email}
					/>

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
										edge="end"
										onClick={() => setShowPassword((prev) => !prev)}
									>
										<Icon icon={showPassword ? eyeFill : eyeOffFill} />
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
						disabled={!isVerified}
					>
						Зарегистрировать
					</LoadingButton>

					{/*<Typography
						variant="body2"
						align="center"
						sx={{ color: "text.secondary", mt: 3 }}
					>
						Регистрируясь, Вы соглашаетесь с&nbsp;
						<NextLink href="/">
							<Link underline="always" color="text.primary" href="#">
								Условиями использования
							</Link>
						</NextLink>
						&nbsp;и&nbsp;
						<NextLink href="/">
							<Link underline="always" color="text.primary" href="#">
								Privacy Policy
							</Link>
						</NextLink>
						.
					</Typography>*/}
				</Stack>
			</Form>
		</FormikProvider>
	);
}
