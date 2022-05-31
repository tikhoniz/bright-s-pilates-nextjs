import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useSnackbar } from "notistack";
// material
import {
	Box,
	Button,
	Avatar,
	Divider,
	ListItem,
	TextField,
	Typography,
	ListItemText,
	ListItemAvatar,
	Stack,
} from "@mui/material";
import { fDate } from "../../../utils/time";
import { LoadingButton } from "@mui/lab";
import useUser from "../../../hooks/useUser";
import { replayPostComment } from "../../../helpers/api/api-blog";
import { v4 as uuidv4 } from "uuid";

// utils

// ----------------------------------------------------------------------

export default function BlogPostCommentItem({
	postId,
	commentId,
	name,
	avatarUrl,
	message,
	tagUser,
	postedAt,
	hasReply,
	post,
	mutate,
}) {
	const [openReply, setOpenReply] = useState(false);
	const { user } = useUser();
	const { enqueueSnackbar } = useSnackbar();

	const isUser = !!user;

	const CommentSchema = Yup.object().shape({
		comment: Yup.string().required("Обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			comment: "",
		},
		validationSchema: CommentSchema,
		onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
			const newAnswer = {
				id: uuidv4(),
				name: user?.name,
				email: user?.email,
				avatarUrl: user?.image?.url,
				postedAt: new Date(),
				message: values.comment,
			};

			try {
				// добавляет комментарий
				const response = await replayPostComment(newAnswer, commentId, postId);

				if (!response.ok) {
					enqueueSnackbar(response.message, { variant: "error" });
					return;
				}

				const updateComments = post.comments.reduce((acc, comment) => {
					if (comment.id === commentId) {
						comment.replyComment.push(newAnswer);
					}
					acc.push(comment);
					return acc;
				}, []);

				mutate({ ...post, comments: updateComments });

				resetForm();
				setSubmitting(false);
			} catch (error) {
				console.error(error);
				setSubmitting(false);
				setErrors({ afterSubmit: error.code });
			}
		},
	});

	const handleOpenReply = () => {
		setOpenReply(true);
	};

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	return (
		<>
			<ListItem
				disableGutters
				sx={{
					alignItems: "flex-start",
					py: 3,
					...(hasReply && {
						ml: "auto",
						width: (theme) => `calc(100% - ${theme.spacing(7)})`,
					}),
				}}
			>
				<ListItemAvatar>
					<Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
				</ListItemAvatar>

				<ListItemText
					primary={name}
					primaryTypographyProps={{ variant: "subtitle1" }}
					secondary={
						<>
							<Typography
								gutterBottom
								variant="caption"
								sx={{
									display: "block",
									color: "text.disabled",
								}}
							>
								{fDate(postedAt)}
							</Typography>
							<Typography component="span" variant="body2">
								<strong>{tagUser}</strong> {message}
							</Typography>
						</>
					}
				/>

				{!hasReply && isUser && (
					<Button
						size="small"
						onClick={handleOpenReply}
						sx={{ position: "absolute", right: 0 }}
					>
						Ответить
					</Button>
				)}
			</ListItem>

			{!hasReply && openReply && (
				<FormikProvider value={formik}>
					<Form noValidate autoComplete="off" onSubmit={handleSubmit}>
						<Stack
							direction="row"
							spacing={2}
							sx={{
								mb: 3,
								ml: "auto",
								width: (theme) => `calc(100% - ${theme.spacing(7)})`,
							}}
						>
							<TextField
								fullWidth
								label="Ответ на комментарий"
								{...getFieldProps("comment")}
								error={Boolean(touched.comment && errors.comment)}
								helperText={touched.comment && errors.comment}
								sx={{
									"& fieldset": {
										borderWidth: `1px !important`,
										borderColor: (theme) =>
											`${theme.palette.grey[500_32]} !important`,
									},
								}}
							/>
							<LoadingButton
								type="submit"
								variant="outlined"
								size="small"
								loading={isSubmitting}
							>
								Комм
							</LoadingButton>
						</Stack>
					</Form>
				</FormikProvider>
			)}

			<Divider
				sx={{
					ml: "auto",
					width: (theme) => `calc(100% - ${theme.spacing(7)})`,
				}}
			/>
		</>
	);
}
