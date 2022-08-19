import { useCallback } from "react";
// next
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik } from "formik";
// material
import {
	Box,
	Grid,
	Card,
	Stack,
	styled,
	Button,
	Container,
	TextField,
	Typography,
	FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// utils
import UploadAvatar from "../upload/UploadAvatar";
import { fData } from "../../utils/formatNumber";
import {
	deleteAvatarPublitio,
	updateUserProfile,
	uploadAvatarPublitio,
} from "../../../src/helpers/api/api-users";
import createAvatarsImageUrl from "../../utils/createAvatarsImageUrl";

//data
import { countriesOptionsRu } from "../../data/countries";
//components
import SelectCoverButton from "./SelectCoverButton";
import useUser from "../../hooks/useUser";

// ----------------------------------------------------------------------
const CoverImgStyle = styled("img")({
	zIndex: 1,
	width: "100%",
	height: "178px",
	objectFit: "cover",
	position: "absolute",
	top: 0,
	left: 0,
});
// ----------------------------------------------------------------------

export default function UserSettings({ router }) {
	const { enqueueSnackbar } = useSnackbar();

	const { user, isLoading, isError, mutate } = useUser();

	if (isLoading) return "загрузка...";
	if (isError) return "ОШИБКА...";

	const {
		_id: userId,
		name,
		city,
		email,
		image,
		imageId,
		cover,
		about,
		country,
		lastName,
		phoneNumber,
	} = user || {};

	//const url = createAvatarsImageUrl(image?.url);

	const UpdateUserSchema = Yup.object().shape({
		displayName: Yup.string().required("Обязательное поле"),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			displayName: name || "",
			displayLastName: lastName || "",
			email: email,
			image: image,
			imageId: imageId,
			cover: cover,
			about: about,
			country: country,
			city: city,
			phoneNumber: phoneNumber,
		},
		validationSchema: UpdateUserSchema,

		onSubmit: async (values, { setErrors, setSubmitting }) => {
			// обновляет профиль
			const updatedUser = {
				id: userId,
				image: values.image,
				imageId: values.imageId,
				city: values.city,
				cover: values.cover,
				email: values.email,
				about: values.about,
				country: values.country,
				displayName: values.displayName,
				phoneNumber: values.phoneNumber,
				displayLastName: values.displayLastName,
			};

			try {
				//проверяет есть ли новое изображение
				if (values?.avatar?.file) {
					const response = await uploadAvatarPublitio({
						id: userId,
						file: values.avatar.file,
					});

					if (!response || !response.success) {
						enqueueSnackbar(
							`Не удалось сохранить изображение [ код ${response.code} ошибка: ${response.message} ]`,
							{
								variant: "error",
							}
						);
						return;
					}

					updatedUser.image = `${process.env.publitio_avatars_folder}${response.public_id}.${response.extension}`;
					updatedUser.imageId = response.id;

					// удаляет старую картинку аватара
					imageId && deleteAvatarPublitio(imageId);
				}

				// обновляет профиль
				const result = await updateUserProfile(updatedUser);

				if (!result.ok) {
					enqueueSnackbar("Не удалось обновить профиль", {
						variant: "error",
					});

					return;
				}

				// добавить в объект пользователя превью
				if (values.avatar.preview) {
					mutate({ ...user, image: { ...image, url: values.avatar.preview } });
				} else {
					mutate(user);
				}

				router.push("/profile");
			} catch (error) {
				setErrors({ afterSubmit: error.code });
				setSubmitting(false);
			}
		},
	});

	const {
		values,
		errors,
		touched,
		isSubmitting,
		handleSubmit,
		getFieldProps,
		setFieldValue,
	} = formik;

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				setFieldValue("avatar", {
					file: file,
					preview: URL.createObjectURL(file),
				});
			}
		},
		[setFieldValue]
	);

	return (
		<Container maxWidth="lg">
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<Card
								sx={{
									pt: "213px",
									pb: 7,
									px: 3,
									textAlign: "center",
								}}
							>
								<SelectCoverButton
									changeHandler={(url) => setFieldValue("cover", url)}
								/>

								<CoverImgStyle alt="profile cover" src={values.cover} />

								<UploadAvatar
									accept="image/*"
									data={values.avatar}
									maxSize={3000000}
									onDrop={handleDrop}
									multiple={false}
									error={Boolean(touched.avatar && errors.avatar)}
									caption={
										<Typography
											variant="caption"
											sx={{
												mt: 2,
												mx: "auto",
												display: "block",
												textAlign: "center",
												color: "text.secondary",
											}}
										>
											Формат *.jpeg, *.jpg, *.png, *.gif
											<br /> максимальный размер {fData(3000000)}
										</Typography>
									}
								/>

								<FormHelperText error sx={{ px: 2, textAlign: "center" }}>
									{touched.avatar && errors.avatar}
								</FormHelperText>
							</Card>
						</Grid>

						<Grid item xs={12} md={8}>
							<Card sx={{ p: 3 }}>
								<Stack spacing={{ xs: 2, md: 3 }}>
									<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
										<TextField
											fullWidth
											label="Имя"
											{...getFieldProps("displayName")}
										/>
										<TextField
											fullWidth
											label="Фамилия"
											{...getFieldProps("displayLastName")}
										/>
									</Stack>

									<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
										<TextField
											fullWidth
											label="Телефон"
											{...getFieldProps("phoneNumber")}
										/>
										<TextField
											fullWidth
											disabled
											label="Email"
											{...getFieldProps("email")}
										/>
									</Stack>

									<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
										<TextField
											select
											fullWidth
											label="Страна"
											placeholder="Country"
											{...getFieldProps("country")}
											SelectProps={{ native: true }}
											error={Boolean(touched.country && errors.country)}
											helperText={touched.country && errors.country}
										>
											<option value="" />
											{countriesOptionsRu.map((option) => (
												<option key={option.code} value={option.label}>
													{option.label}
												</option>
											))}
										</TextField>
										<TextField
											fullWidth
											label="Город"
											{...getFieldProps("city")}
										/>
									</Stack>

									<TextField
										{...getFieldProps("about")}
										fullWidth
										multiline
										minRows={4}
										maxRows={4}
										label="О себе"
									/>
								</Stack>

								<Box
									sx={{
										mt: 3,
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Button variant="outlined" onClick={() => router.back()}>
										назад
									</Button>

									<LoadingButton
										type="submit"
										variant="contained"
										loading={isSubmitting}
									>
										Сохранить изменения
									</LoadingButton>
								</Box>
							</Card>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>
		</Container>
	);
}

//createdAt: "2021-10-06T14:42:18.964Z"
//email: "brightspilates@gmail.com"
//groups: 0
//image: "/avatars/avatar_default.jpg"
//lastName: "Head"
//name: "Coach"
//password: "$2a$12$RrK7TH4v3aIkYhU/Y0NfWucflQdwV.KoWM/2t4JkvPvjzZERpev5e"
//personals: 0
//subscription: "2021-10-06T14:42:18.964Z"
//updatedAt: "2021-10-06T14:42:18.964Z"
//_id: "615db5ca24d2ee4475d3f3c3"

//code: 201;
//created_at: "2021-10-11 18:06:40";
//description: "";
//extension: "jpeg";
//folder: "userAvatars/";
//folder_id: "8iy1t6ot";
//height: 572;
//hits: 0;
//id: "gck17y0H";
//message: "File uploaded";
//option_ad: "enabled";
//option_download: "enabled";
//option_transform: "enabled";
//privacy: "public";
//public_id: "6162b376318047b793d00636-avatar-g";
//size: 41184;
//success: true;
//tags: "";
//title: "6162b376318047b793d00636-avatar";
//type: "image";
//updated_at: "2021-10-11 18:06:40";
//url_download: "https://media.publit.io/download/userAvatars/6162b376318047b793d00636-avatar-g.jpeg?at=eyJpdiI6IkJWcmVjVEp6Tno3WVN3MEZwSmlyWUE9PSIsInZhbHVlIjoiK1JxRnNXc2dUdndtbEJRejZYdWJqcnlPZ2dJMHJrdnVFeGhDd0VDZGZJRT0iLCJtYWMiOiIwMWU4YmU2YmQ0MGJjN2M5NzU0YWI2YTQ0MjU1MzVlN2ZiNDZjYzgzOTE2NzQ2NjBhNGFlNDcyMDUxNWU1ZmM4In0=";
//url_embed: "https://media.publit.io/file/userAvatars/6162b376318047b793d00636-avatar-g.html";
//url_preview: "https://media.publit.io/file/userAvatars/6162b376318047b793d00636-avatar-g.jpeg";
//url_short: "https://media.publit.io/file/gck17y0H.jpeg";
//url_thumbnail: "https://media.publit.io/file/w_300,h_200,c_fill/userAvatars/6162b376318047b793d00636-avatar-g.jpg";
//versions: 0;
//width: 458;
//wm_id: null;

//about: "qweuuuu "
//avatar: "blob:http://localhost:3001/d4688879-10a4-44bb-b6a1-05860254cd8c"
//city: "йцук"
//country: "Болгария"
//cover: "/covers/hermit_crabs-cover.png"
//displayLastName: "iz"
//displayName: "Diana"
//email: "brightspilates@gmail.com"
//phoneNumber: ""
