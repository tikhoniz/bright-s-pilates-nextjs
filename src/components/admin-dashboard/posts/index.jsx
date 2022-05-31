import * as Yup from "yup";
import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";
import { Form, FormikProvider, useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
// material
import {
	Card,
	Chip,
	Grid,
	Stack,
	Switch,
	Button,
	TextField,
	Typography,
	Autocomplete,
	FormControlLabel,
	FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
//  helpers
import {
	createBlogPost,
	uploadCoverBlogPost,
} from "../../../helpers/api/api-blog";
// hooks
import useUser from "../../../hooks/useUser";
//components
import QuillEditor from "../../editor/quill";
import BlogNewPostPreview from "./BlogNewPostPreview";
import UploadSingleFile from "../../upload/UploadSingleFile";

const TAGS_OPTION = [
	"Toy Story 3",
	"Logan",
	"Full Metal Jacket",
	"Dangal",
	"The Sting",
	"2001: A Space Odyssey",
	"Singin' in the Rain",
	"Toy Story",
	"Bicycle Thieves",
	"The Kid",
	"Inglourious Basterds",
	"Snatch",
	"3 Idiots",
];
// ----------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
	marginBottom: theme.spacing(1),
}));
// ----------------------------------------------------

const NewPost = () => {
	const [open, setOpen] = useState(false);

	const { user } = useUser();

	const { enqueueSnackbar } = useSnackbar();

	const handleOpenPreview = () => {
		setOpen(true);
	};

	const handleClosePreview = () => {
		setOpen(false);
	};

	const NewBlogSchema = Yup.object().shape({
		title: Yup.string().required("Заголовок обязателен"),
		description: Yup.string().required("Описание обязательно"),
		content: Yup.string()
			.min(500, "Минимум 500 символов")
			.required("Текст обязателен"),
		cover: Yup.mixed().required("Обложка обязательна"),
	});

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			content: "",
			cover: null,
			tags: ["Logan"],
			publish: true,
			comments: true,
			metaTitle: "",
			metaDescription: "",
			metaKeywords: ["Logan"],
		},
		validationSchema: NewBlogSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				// загрузка обложки поста
				const resUpload = await uploadCoverBlogPost({
					id: uuidv4(),
					file: values.cover.file,
				});

				if (!resUpload || !resUpload.success) {
					enqueueSnackbar(
						`Не удалось сохранить обложку [ код ${resUpload.code} ошибка: ${resUpload.message} ]`,
						{
							variant: "error",
						}
					);

					return;
				}

				const cover = {
					url: `${resUpload.public_id}.${resUpload.extension}`,
					id: resUpload.id,
				};

				// обновляет профиль
				const resCreate = await createBlogPost({
					tags: values.tags,
					cover: cover,
					title: values.title,
					author: {
						name: user?.name,
						avatarUrl: user?.image?.url,
					},
					content: values.content,
					publish: values.publish,
					comments: values.comments,
					metaTitle: values.metaTitle,
					description: values.description,
					metaKeywords: values.metaKeywords,
					metaDescription: values.metaDescription,
				});

				if (!resCreate.ok) {
					enqueueSnackbar(resCreate.message || "Не удалось создать пост", {
						variant: "error",
					});
					return;
				}

				resetForm();
				handleClosePreview();
				setSubmitting(false);
				enqueueSnackbar("Пост опубликован", { variant: "success" });
			} catch (error) {
				console.error(error);
				setSubmitting(false);
			}
		},
	});

	const {
		errors,
		values,
		touched,
		handleSubmit,
		isSubmitting,
		setFieldValue,
		getFieldProps,
	} = formik;

	const handleDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];

			if (file) {
				setFieldValue("cover", {
					file: file,
					preview: URL.createObjectURL(file),
				});
			}
		},
		[setFieldValue]
	);

	return (
		<>
			<FormikProvider value={formik}>
				<Form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
							<Card sx={{ p: 3 }}>
								<Stack spacing={3}>
									<TextField
										fullWidth
										label="Post Title"
										{...getFieldProps("title")}
										error={Boolean(touched.title && errors.title)}
										helperText={touched.title && errors.title}
									/>

									<TextField
										fullWidth
										multiline
										minRows={3}
										maxRows={5}
										label="Description"
										{...getFieldProps("description")}
										error={Boolean(touched.description && errors.description)}
										helperText={touched.description && errors.description}
									/>

									<div>
										<LabelStyle>Контент</LabelStyle>

										<QuillEditor
											id="post-content"
											value={values.content}
											onChange={(val) => setFieldValue("content", val)}
											error={Boolean(touched.content && errors.content)}
										/>
										{touched.content && errors.content && (
											<FormHelperText
												error
												sx={{ px: 2, textTransform: "capitalize" }}
											>
												{touched.content && errors.content}
											</FormHelperText>
										)}
									</div>

									<div>
										<LabelStyle>Обложка</LabelStyle>
										<UploadSingleFile
											maxSize={3145728}
											accept="image/*"
											file={values.cover}
											onDrop={handleDrop}
											error={Boolean(touched.cover && errors.cover)}
										/>
										{touched.cover && errors.cover && (
											<FormHelperText error sx={{ px: 2 }}>
												{touched.cover && errors.cover}
											</FormHelperText>
										)}
									</div>
								</Stack>
							</Card>
						</Grid>

						<Grid item xs={12} md={4}>
							<Card sx={{ p: 3 }}>
								<Stack spacing={3}>
									<div>
										<FormControlLabel
											control={
												<Switch
													{...getFieldProps("publish")}
													checked={values.publish}
												/>
											}
											label="Publish"
											labelPlacement="start"
											sx={{
												mb: 1,
												mx: 0,
												width: "100%",
												justifyContent: "space-between",
											}}
										/>

										<FormControlLabel
											control={
												<Switch
													{...getFieldProps("comments")}
													checked={values.comments}
												/>
											}
											label="Enable comments"
											labelPlacement="start"
											sx={{
												mx: 0,
												width: "100%",
												justifyContent: "space-between",
											}}
										/>
									</div>

									<Autocomplete
										multiple
										freeSolo
										value={values.tags}
										onChange={(event, newValue) => {
											setFieldValue("tags", newValue);
										}}
										options={TAGS_OPTION.map((option) => option)}
										renderTags={(value, getTagProps) =>
											value.map((option, index) => (
												<Chip
													{...getTagProps({ index })}
													key={option}
													size="small"
													label={option}
												/>
											))
										}
										renderInput={(params) => (
											<TextField {...params} label="Tags" />
										)}
									/>

									<TextField
										fullWidth
										label="Meta title"
										{...getFieldProps("metaTitle")}
									/>

									<TextField
										fullWidth
										multiline
										minRows={3}
										maxRows={5}
										label="Meta description"
										{...getFieldProps("metaDescription")}
									/>

									<Autocomplete
										multiple
										freeSolo
										value={values.tags}
										onChange={(event, newValue) => {
											setFieldValue("metaKeywords", newValue);
										}}
										options={TAGS_OPTION.map((option) => option)}
										renderTags={(value, getTagProps) =>
											value.map((option, index) => (
												<Chip
													{...getTagProps({ index })}
													key={option}
													size="small"
													label={option}
												/>
											))
										}
										renderInput={(params) => (
											<TextField {...params} label="Meta keywords" />
										)}
									/>
								</Stack>
							</Card>

							<Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
								<Button
									fullWidth
									type="button"
									color="inherit"
									variant="outlined"
									size="large"
									onClick={handleOpenPreview}
									sx={{ mr: 1.5 }}
								>
									Предпросмотр
								</Button>
								<LoadingButton
									fullWidth
									type="submit"
									variant="contained"
									size="large"
									loading={isSubmitting}
								>
									Опубликовать
								</LoadingButton>
							</Stack>
						</Grid>
					</Grid>
				</Form>
			</FormikProvider>

			<BlogNewPostPreview
				formik={formik}
				openPreview={open}
				onClosePreview={handleClosePreview}
			/>
		</>
	);
};

export default NewPost;
