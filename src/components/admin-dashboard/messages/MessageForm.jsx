import { useRef, useState } from "react";
//material
import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
//helpers
import { updateUserMessage } from "../../../helpers/api/api-messages";
import { useSWRConfig } from "swr";

export default function MessageForm({ message, onClose }) {
	const [isSubmitting, setSubmitting] = useState(false);
	const messageInputRef = useRef(response);
	const { mutate } = useSWRConfig();

	const { _id: messageId, subject, message: userMessage, response } = message;

	const handleSubmit = async (evt) => {
		evt.preventDefault();

		setSubmitting(true);

		const response = await updateUserMessage({
			messageId,
			answer: messageInputRef.current.value,
		});

		if (!response.ok) {
			console.log(response.message);
			setSubmitting(false);
			return;
		}

		mutate(`/api/messages`);

		setSubmitting(false);
		onClose();
	};

	return (
		<>
			<Typography variant="body2" gutterBottom>
				<Typography variant="subtitle1" component="span">
					Тема: &nbsp;
				</Typography>
				{subject}
			</Typography>

			<Typography variant="body2" gutterBottom>
				<Typography variant="subtitle1" component="span">
					Сообщение: &nbsp;
				</Typography>
				{userMessage}
			</Typography>

			<form noValidate onSubmit={handleSubmit}>
				<TextField
					fullWidth
					multiline
					minRows={4}
					maxRows={10}
					label="Ответ"
					inputRef={messageInputRef}
				/>

				<Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
					<LoadingButton
						size="medium"
						type="submit"
						variant="contained"
						loading={isSubmitting}
					>
						Ответить
					</LoadingButton>
				</Box>
			</form>
		</>
	);
}

//{
//		_id: '617800fa41f6c575f7621759',
//		user: '6164b6becf7d427102f78840',
//		subject: 'knknk',
//		message: 'mlmoo',
//		isAnswered: false,
//		response: null,
//		createdAt: '2021-10-26T13:22:02.054Z',
//		updatedAt: '2021-10-26T13:22:02.054Z'
//	}
