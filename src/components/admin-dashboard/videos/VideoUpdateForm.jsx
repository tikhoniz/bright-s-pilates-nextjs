import React, { useCallback, useEffect } from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { isString } from "lodash";

import { Form, FormikProvider, useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";

// material
import {
	Grid,
	Card,
	Radio,
	Stack,
	Select,
	Switch,
	TextField,
	InputLabel,
	Typography,
	RadioGroup,
	FormControl,
	CardHeader,
	FormControlLabel,
	FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import PickerDateTime from "../../picker/PickerDateTime";
// animation
import { MotionInView, varFadeIn } from "../../animate";
import { updateGroupClass } from "../../../helpers/api/api-classes";
import { useSWRConfig } from "swr";
import UploadSingleFile from "../../upload/UploadSingleFile";
import {
	createVideo,
	deleteCoverYouTubeVideo,
	updateVideoYT,
	uploadCoverYouTubeVideo,
} from "../../../helpers/api/api-youtubeVideos";

//---------------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
}));

//---------------------------------------------------------------------------

const createVideoYoutube = async (values) => {
	const resUpload = await uploadCoverYouTubeVideo({
		id: uuidv4(),
		file: values.cover.file,
	});

	if (!resUpload || !resUpload.success) {
		return resUpload;
	}

	const cover = {
		url: `${resUpload.public_id}.${resUpload.extension}`,
		id: resUpload.id,
	};

	const response = await createVideo({
		title: values.title,
		youtubeId: values.youtubeId,
		description: values.description,
		cover: cover,
	});

	return response;
};

const updateVideoYoutube = async (video) => {
	if (video?.cover?.file) {
		const resUpload = await uploadCoverYouTubeVideo({
			id: uuidv4(),
			file: video.cover.file,
		});

		if (!resUpload || !resUpload.success) {
			return resUpload;
		}

		video.cover = {
			url: `${resUpload.public_id}.${resUpload.extension}`,
			id: resUpload.id,
		};
	}

	const response = await updateVideoYT(video);

	return response;
};

const VideoUpdateForm = ({ video, onClose }) => {
	const { mutate } = useSWRConfig();
	const { enqueueSnackbar } = useSnackbar();
	// если присутствует ID присвоенное базой данных
	const updateVideoId = video?._id;

	const coverUrl =
		process.env.publitio_youtube_video_covers_folder + video?.cover?.url;

	const ClassUpdateSchema = Yup.object().shape({
		title: Yup.string().required("Необходимо заполнить"),
		youtubeId: Yup.string().required("Необходимо заполнить"),
		description: Yup.string().required("Необходимо заполнить"),
		cover: Yup.mixed().required("Обложка обязательна"),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			cover: video.cover ? coverUrl : null,
			title: video.title,
			youtubeId: video.youtubeId,
			description: video.description,
		},
		validationSchema: ClassUpdateSchema,
		onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
			try {
				if (updateVideoId) {
					const newCover = values?.cover?.file;

					const updatedVideo = {
						_id: updateVideoId,
						title: values.title,
						cover: newCover ? values.cover : video.cover,
						youtubeId: values.youtubeId,
						createdAt: video.createdAt,
						description: values.description,
					};

					const response = await updateVideoYoutube(updatedVideo);

					if (!response.ok) {
						console.log(
							"Не удалось сохранить видео. Причина: ",
							response.message
						);
						setSubmitting(false);
						return;
					}
					// удаляет старую обложку если есть новая
					newCover && deleteCoverYouTubeVideo(video?.cover?.id);
				} else {
					const response = await createVideoYoutube(values);

					if (!response.ok) {
						enqueueSnackbar(
							`Ошибка создания видео [ ОШИБКА: ${response.message}, код ошибки: ${response.code} ]`,
							{
								variant: "error",
								autoHideDuration: 10000,
							}
						);
						setSubmitting(false);
						return;
					}
				}

				mutate(`/api/youtubeVideos`);
				setSubmitting(false);
				onClose();
			} catch (error) {
				console.error(error);
				setErrors({ afterSubmit: error.message });
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
				setFieldValue("cover", {
					file: file,
					preview: URL.createObjectURL(file),
				});
			}
		},
		[setFieldValue]
	);

	return (
		<Card sx={{ p: 3, maxWidth: 900, m: "0 auto 100px " }}>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<MotionInView variants={varFadeIn}>
						<Stack spacing={3}>
							{/* Название видео */}
							<TextField
								fullWidth
								{...getFieldProps("title")}
								type="text"
								label="Название"
								error={Boolean(touched.title && errors.title)}
								helperText={touched.title && errors.title}
							/>
							{/* Описание видео */}
							<TextField
								fullWidth
								{...getFieldProps("description")}
								type="text"
								label="Описание ролика"
								error={Boolean(touched.title && errors.title)}
								helperText={touched.title && errors.title}
							/>
							{/* ID видео из видеохостинга Youtube */}
							<TextField
								fullWidth
								{...getFieldProps("youtubeId")}
								type="text"
								label="ID видео на YouTube"
								error={Boolean(touched.title && errors.title)}
								helperText={touched.title && errors.title}
							/>

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

							<LoadingButton
								size="large"
								type="submit"
								variant="contained"
								loading={isSubmitting}
							>
								Сохранить
							</LoadingButton>
						</Stack>
					</MotionInView>
				</Form>
			</FormikProvider>
		</Card>
	);
};

export default VideoUpdateForm;

//accessCode: "0000"
//coach: "Diana"
//conferenceId: "00000000"
//createdAt: "2021-10-27T20:00:13.727Z"
//creator: "brightspilates@gmail.com"
//duration: "60"
//freeAccess: true
//invitationLink: "add_URL"
//level: "beginer"
//participants: []
//startTime: "2021-10-27T20:00:13.727Z"
//title: "Бесплатный класс"
//type: "group"
//updatedAt: "2021-10-27T20:05:22.243Z"
//_id: "6179afcdec94c734539c824c"
