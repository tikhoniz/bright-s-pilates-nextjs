import { useState } from "react";
// next
import { signIn } from "next-auth/react";
// построитель схем JavaScript для синтаксического анализа и проверки значений
import * as Yup from "yup";
// обнаруживает изменения элемента ввода с помощью функции
import { useFormik, Form, FormikProvider } from "formik";
// hooks
import useIsMountedRef from "../../hooks/useIsMountedRef";
// icons
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
	Link,
	Stack,
	Alert,
	TextField,
	IconButton,
	InputAdornment,
	Box,
	Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

//----------------------------------------------------------------------

export default function LoginForm({ router, isVerified, setResetHandler }) {
	const [showPassword, setShowPassword] = useState(false);

	const isMountedRef = useIsMountedRef();

	// валидация с помощью пакета Yup
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email(
				"* адрес электронной почты должен соответствовать формату email@post.com"
			)
			.required("* обязательное поле"),
		password: Yup.string().required("* обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			remember: true,
		},
		validationSchema: LoginSchema,
		onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
			try {
				const { error } = await signIn("credentials", {
					redirect: false,
					email: values.email,
					password: values.password,
				});
				if (!error) {
					router.back();
				} else {
					setErrors({ afterSubmit: error });
				}
			} catch (error) {
				console.error(error);
				resetForm();
				if (isMountedRef.current) {
					setSubmitting(false);
					setErrors({ afterSubmit: error.message });
				}
			}
		},
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
		formik;

	const handleShowPassword = () => {
		setShowPassword((show) => !show);
	};

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					{errors.afterSubmit && (
						<Alert severity="error">{errors.afterSubmit}</Alert>
					)}

					<Box sx={{ flexGrow: 1 }}>
						<Typography variant="h4" gutterBottom>
							Вход в аккаунт
						</Typography>
						<Typography sx={{ color: "text.secondary" }}>
							Введите свой почтовый адрес и пароль.
						</Typography>
					</Box>

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
									<IconButton onClick={handleShowPassword} edge="end">
										<Icon icon={showPassword ? eyeFill : eyeOffFill} />
										<Icon />
									</IconButton>
								</InputAdornment>
							),
						}}
						error={Boolean(touched.password && errors.password)}
						helperText={touched.password && errors.password}
					/>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="flex-end"
					sx={{ my: 2 }}
				>
					{/*<FormControlLabel
						control={
							<Checkbox
								{...getFieldProps("remember")}
								checked={values.remember}
							/>
						}
						label="Запомнить меня"
					/>*/}

					<Link
						variant="subtitle2"
						onClick={() => setResetHandler(true)}
						sx={{ cursor: "pointer" }}
					>
						Забыли пароль?
					</Link>
				</Stack>

				<LoadingButton
					fullWidth
					size="large"
					type="submit"
					variant="contained"
					loading={isSubmitting}
					disabled={!isVerified}
				>
					Вход
				</LoadingButton>
			</Form>
		</FormikProvider>
	);
}
