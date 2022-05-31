import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useSnackbar } from "notistack";
// material
import { styled } from "@mui/material";
import { Stack, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useUser from "../../../hooks/useUser";
import { useSession } from "next-auth/react";
import { createBlogPostComment } from "../../../helpers/api/api-blog";
// utils
import { v4 as uuidv4 } from "uuid";

// ----------------------------------------------------------------------

const RootStyles = styled("div")(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadiusMd,
	backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

export default function BlogPostCommentForm({ post, mutate }) {
	const { user } = useUser();

	const isUser = !!user;

	const { enqueueSnackbar } = useSnackbar();

	const CommentSchema = Yup.object().shape({
		comment: Yup.string().required("Обязательное поле"),
	});

	const formik = useFormik({
		initialValues: {
			comment: "",
		},
		validationSchema: CommentSchema,
		onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
			const newComment = {
				id: uuidv4(),
				name: user?.name,
				email: user?.email,
				avatarUrl: user?.image?.url,
				message: values.comment,
				postedAt: new Date(),
				replyComment: [],
			};

			try {
				// добавляет комментарий
				const response = await createBlogPostComment(newComment, post._id);

				if (!response.ok) {
					enqueueSnackbar(response.message, { variant: "error" });
					return;
				}

				mutate({ ...post, comments: [...post.comments, newComment] });

				resetForm();
				setSubmitting(false);
			} catch (error) {
				console.error(error);
				setSubmitting(false);
				setErrors({ afterSubmit: error.code });
			}
		},
	});

	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	return (
		<RootStyles>
			<Typography variant="subtitle1" sx={{ mb: 3 }}>
				Добавить комментарий
			</Typography>

			<FormikProvider value={formik}>
				<Form noValidate autoComplete="off" onSubmit={handleSubmit}>
					<Stack spacing={3} alignItems="flex-end">
						{isUser ? (
							<TextField
								fullWidth
								multiline
								minRows={3}
								maxRows={5}
								label="Ваш комментарий *"
								{...getFieldProps("comment")}
								error={Boolean(touched.comment && errors.comment)}
								helperText={touched.comment && errors.comment}
							/>
						) : (
							<Typography
								variant="subtitle1"
								alignSelf="center"
								sx={{ m: 3, color: "text.disabled" }}
							>
								Kомментировать публикацию могут только авторизированные
								пользователи
							</Typography>
						)}

						<LoadingButton
							type="submit"
							variant="contained"
							loading={isSubmitting}
							disabled={!isUser}
						>
							Комментировать
						</LoadingButton>
					</Stack>
				</Form>
			</FormikProvider>
		</RootStyles>
	);
}
