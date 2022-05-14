import React, { useEffect } from "react";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
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
} from "@mui/material";
import { styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import PickerDateTime from "../../picker/PickerDateTime";
// animation
import { MotionInView, varFadeIn } from "../../animate";
import { updateGroupClass } from "../../../helpers/api/api-classes";
import { useSWRConfig } from "swr";

//---------------------------------------------------------------------------

const DURATION_OPTIONS = ["30", "60", "90", "120"];

const LEVEL_OPTIONS = [
	{ value: "beginer", label: "Начальный" },
	{ value: "intermediate", label: "Средний" },
	{ value: "advance", label: "Продвинутый" },
];

const COACH_OPTIONS = ["Диана"];

const LabelStyle = styled(Typography)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.secondary,
}));

//---------------------------------------------------------------------------

const ClassUpdateForm = ({ cls, onClose }) => {
	const { mutate } = useSWRConfig();

	const {
		_id: classId,
		title,
		level,
		coach,
		duration,
		startTime,
		freeAccess,
		accessCode,
		conferenceId,
		invitationLink,
	} = cls;

	const ClassUpdateSchema = Yup.object().shape({
		title: Yup.string().required("Необходимо заполнить"),
		//email: Yup.string().required('Email is required').email(),
		//phoneNumber: Yup.string().required('Phone number is required'),
		//address: Yup.string().required('Address is required'),
		//country: Yup.string().required('country is required'),
		//company: Yup.string().required('Company is required'),
		//state: Yup.string().required('State is required'),
		//city: Yup.string().required('City is required'),
		//role: Yup.string().required('Role Number is required'),
		//avatarUrl: Yup.mixed().required('Avatar is required')
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			title,
			level,
			coach,
			classId,
			duration,
			startTime,
			accessCode,
			freeAccess,
			conferenceId,
			invitationLink,
		},
		validationSchema: ClassUpdateSchema,
		onSubmit: async (values, { setErrors, resetForm, setSubmitting }) => {
			try {
				const response = await updateGroupClass({
					id: values.classId,
					coach: values.coach,
					title: values.title,
					level: values.level,
					duration: values.duration,
					startTime: values.startTime,
					accessCode: values.accessCode,
					freeAccess: values.freeAccess,
					conferenceId: values.conferenceId,
					invitationLink: values.invitationLink,
				});

				if (!response.ok) {
					console.log(
						"Не удалось обновить групповой класс. Причина: ",
						response.message
					);
					setSubmitting(false);
					return;
				}

				mutate(`/api/admin/groups`);
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

	// если бесплатная тренировка устанавливает штатные данные
	useEffect(() => {
		if (values.freeAccess) {
			values.invitationLink = process.env.zoom_invitation_link;
			values.accessCode = process.env.zoom_meeting_password;
			values.conferenceId = process.env.zoom_meeting_number;
			values.duration = "30";
			values.title = "Pilates mat ( базовый урок )";
		}
	}, [values.freeAccess]);

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<MotionInView variants={varFadeIn}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} md={6} lg={4}>
							<Card
								sx={{
									pb: 4,
									px: 2,
								}}
							>
								<CardHeader title="Время" sx={{ pb: 2 }} />
								<PickerDateTime
									value={values.startTime}
									onChange={(date) => setFieldValue("startTime", date)}
								/>
							</Card>
						</Grid>

						{/*платный/бесплатный класс*/}
						<Grid item xs={12} sm={6} md={6} lg={3}>
							<Card
								sx={{
									py: 4,
									px: 2,
								}}
							>
								<Stack spacing={3}>
									<FormControlLabel
										labelPlacement="start"
										control={
											<Switch
												{...getFieldProps("freeAccess")}
												checked={values.freeAccess}
											/>
										}
										label={
											<Typography
												variant="subtitle2"
												sx={{ mr: 0.5, whiteSpace: "nowrap" }}
											>
												Бесплатный класс
											</Typography>
										}
									/>
									{/* Тренер */}
									<FormControl fullWidth>
										<InputLabel>Тренер</InputLabel>
										<Select
											label="Тренер"
											native
											{...getFieldProps("coach")}
											value={values.coach}
										>
											{COACH_OPTIONS.map((coach) => (
												<option key={coach} value={coach}>
													{coach}
												</option>
											))}
										</Select>
									</FormControl>
								</Stack>
							</Card>
						</Grid>

						{/* Длительность */}
						<Grid item xs={12} md={12} lg={5}>
							<Card
								sx={{
									py: 2,
									px: 2,
								}}
							>
								<Stack
									sx={{
										flexDirection: {
											md: "row",
											lg: "column",
										},
										justifyContent: { md: "space-around", lg: "initial" },
									}}
								>
									<Stack
										spacing={1}
										sx={{
											mb: { md: 0, lg: 1 },
										}}
									>
										<LabelStyle>Длительность</LabelStyle>
										<RadioGroup {...getFieldProps("duration")} row>
											{DURATION_OPTIONS.map((time) => (
												<FormControlLabel
													key={time}
													value={time}
													control={<Radio />}
													label={time}
												/>
											))}
										</RadioGroup>
									</Stack>
									{/* Сложность тренировки */}
									<Stack spacing={1}>
										<LabelStyle>Сложность тренировки</LabelStyle>
										<RadioGroup {...getFieldProps("level")} row>
											{LEVEL_OPTIONS.map((lvl) => (
												<FormControlLabel
													key={lvl.value}
													value={lvl.value}
													control={<Radio />}
													label={lvl.label}
												/>
											))}
										</RadioGroup>
									</Stack>
								</Stack>
							</Card>
						</Grid>

						<Grid item xs={12} md={12}>
							<Stack spacing={3}>
								{/* Название класса */}
								<TextField
									fullWidth
									{...getFieldProps("title")}
									type="text"
									label="Название"
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title}
								/>

								{/* Ссылка-приглашение */}
								<TextField
									fullWidth
									{...getFieldProps("invitationLink")}
									type="text"
									label="Ссылка-приглашение"
									error={Boolean(touched.title && errors.title)}
									helperText={touched.title && errors.title}
									disabled={values.freeAccess}
								/>

								<Stack spacing={3} direction="row">
									{/* ID конференции */}
									<TextField
										fullWidth
										{...getFieldProps("conferenceId")}
										type="text"
										label="ID конференции"
										error={Boolean(touched.title && errors.title)}
										helperText={touched.title && errors.title}
										disabled={values.freeAccess}
									/>

									{/* Код доступа */}
									<TextField
										fullWidth
										{...getFieldProps("accessCode")}
										type="text"
										label="Код доступа"
										error={Boolean(touched.title && errors.title)}
										helperText={touched.title && errors.title}
										disabled={values.freeAccess}
									/>
								</Stack>

								<LoadingButton
									fullWidth
									size="large"
									type="submit"
									variant="contained"
									loading={isSubmitting}
								>
									Сохранить
								</LoadingButton>
							</Stack>
						</Grid>
					</Grid>
				</MotionInView>
			</Form>
		</FormikProvider>
	);
};

export default ClassUpdateForm;

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
