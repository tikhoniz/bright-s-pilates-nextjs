import React from "react";
//material
import {
	Button,
	Stack,
	TableCell,
	TableRow,
	Box,
	Typography,
} from "@mui/material";
//helpers
import { dayMonthYearDate, humanReadableTime } from "../../../utils/time";
//icons
import OpenMessageIcon from "../../icons/icon_open_message";
import NewMessageIcon from "../../icons/icon_new_message";

export default function MessagesRow({ userMessage, users, onReplyMessage }) {
	const {
		_id: messageId,
		user,
		subject,
		message,
		response,
		createdAt,
		updatedAt,
	} = userMessage;

	const sender = users.find((item) => item.email === user);

	return (
		<TableRow>
			<TableCell>
				{response ? (
					<OpenMessageIcon sx={{ height: 30 }} />
				) : (
					<Button onClick={() => onReplyMessage(messageId)}>
						<NewMessageIcon width={30} height={30} color="red" />
					</Button>
				)}
			</TableCell>

			<TableCell>
				<Stack>
					<time dateTime={createdAt}>
						{dayMonthYearDate(createdAt, "ru-RU")}
					</time>
					<time dateTime={createdAt}>
						в {humanReadableTime(createdAt, "ru-RU")}
					</time>
				</Stack>
			</TableCell>

			<TableCell>
				<Stack>
					<Typography> {sender?.name}</Typography>
					<Typography> {sender?.email}</Typography>
				</Stack>
			</TableCell>

			<TableCell>{subject}</TableCell>

			<TableCell>{message}</TableCell>

			<TableCell>
				{response && (
					<Stack>
						<time dateTime={updatedAt}>
							{dayMonthYearDate(updatedAt, "ru-RU")}
						</time>
						<time dateTime={updatedAt}>
							в {humanReadableTime(updatedAt, "ru-RU")}
						</time>
					</Stack>
				)}
				{response ? (
					<Box
						onClick={() => onReplyMessage(messageId)}
						sx={{ cursor: "pointer", "&:hover": { bgcolor: "grey.300" } }}
					>
						{response}
					</Box>
				) : (
					<p>Без ответа</p>
				)}
			</TableCell>
		</TableRow>
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
