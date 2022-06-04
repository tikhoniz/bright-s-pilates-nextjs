import { useState, useMemo } from "react";
//material
import {
	Stack,
	TableRow,
	TableCell,
	IconButton,
	Typography,
	Button,
	TextField,
	MenuItem,
	Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
//helpers
import { deleteClass } from "../../../helpers/api/api-classes";
// utils
import { findParticipants } from "../../../utils/findParticipants";

import {
	dayMonthYearDate,
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../../utils/time";
import MHidden from "../../@material-extend/MHidden";
//icons
import { Icon } from "@iconify/react";
import PaymentIcon from "../../icons/icon_payment";
import NotPaymentIcon from "../../icons/icon_not_payment";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";
import BaselinePerson from "@iconify/icons-ic/baseline-person";
import BaselineSetting from "@iconify/icons-ic/baseline-settings";
import BaselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import { useSWRConfig } from "swr";
import ModalBasic from "../../modal/ModalBasic";

export default function UpcomingClass({ cls, users, onUpdateClass }) {
	const [isSubmitting, setSubmitting] = useState(false);
	const [open, setOpen] = useState(false);

	const { mutate } = useSWRConfig();

	const participants = useMemo(
		() => findParticipants(users, cls),
		[users, cls]
	);

	const {
		_id: classId,
		coach,
		type,
		level,
		title,
		avatar,
		duration,
		startTime,
		accessCode,
		freeAccess,
		conferenceId,
		invitationLink,
	} = cls;

	async function deleteClassHandler() {
		setSubmitting(true);

		const response = await deleteClass(classId);

		if (!response.ok) {
			console.log("Не удалось удалить класс");
			setSubmitting(false);
		}

		mutate(`/api/classes/admin`);
	}

	return (
		<TableRow>
			<MHidden width="smDown">
				<TableCell>
					{freeAccess ? (
						<NotPaymentIcon sx={{ height: 30 }} />
					) : (
						<PaymentIcon sx={{ height: 30, minWidth: 30 }} />
					)}
				</TableCell>
			</MHidden>

			<TableCell>
				<Stack>
					<MHidden width="smDown">
						<time dateTime={startTime}>
							{humanReadableWeekday(startTime, "ru-RU")}
						</time>
					</MHidden>

					<MHidden width="smDown">
						<time dateTime={startTime}>
							{humanReadableDate(startTime, "ru-RU")}
						</time>
					</MHidden>

					<MHidden width="smUp">
						<time dateTime={startTime}>
							{dayMonthYearDate(startTime, "ru-RU")}
						</time>
					</MHidden>
					<time dateTime={startTime}>
						в {humanReadableTime(startTime, "ru-RU")}
					</time>
				</Stack>
			</TableCell>

			<MHidden width="smDown">
				<TableCell>
					<Icon
						icon={type !== "personal" ? BaselineGroups : BaselinePerson}
						width={30}
						height={30}
					/>
				</TableCell>
				<TableCell>
					{(level === "beginer" && "начальный") ||
						(level === "intermediate" && "средний") ||
						(level === "advance" && "продвинутый")}
				</TableCell>
				<TableCell sx={{ maxWidth: 300 }}>{title}</TableCell>
				<TableCell>
					<Stack direction="row" alignItems="center" spacing={2}>
						<Typography variant="subtitle2">{coach}</Typography>
					</Stack>
				</TableCell>
			</MHidden>

			<TableCell align="center">
				<ModalBasic open={open} onClose={() => setOpen(false)}>
					{participants.map((item) => (
						<MenuItem key={item.email} value={item.email}>
							{item.email}
						</MenuItem>
					))}
				</ModalBasic>

				{participants.length > 0 ? (
					<Button onClick={() => setOpen(true)}>{participants.length}</Button>
				) : (
					<Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
						0
					</Typography>
				)}
			</TableCell>

			<TableCell>
				{duration}
				<Typography variant="body2" sx={{ color: "text.secondary" }}>
					минут
				</Typography>
			</TableCell>

			<MHidden width="smDown">
				<TableCell sx={{ maxWidth: 300, overflow: "hidden" }}>
					{invitationLink}
				</TableCell>
				<TableCell>{conferenceId} </TableCell>
				<TableCell>{accessCode} </TableCell>
			</MHidden>

			<TableCell
				sx={{
					padding: 0,
				}}
			>
				<IconButton
					onClick={() => onUpdateClass(cls)}
					color="primary"
					sx={{
						padding: 0,
					}}
				>
					<Icon icon={BaselineSetting} width={30} height={30} />
				</IconButton>
			</TableCell>

			<TableCell
				sx={{
					padding: 0,
					paddingRight: { xs: "0 !important", md: "24px !important" },
				}}
			>
				<LoadingButton
					loading={isSubmitting}
					onClick={deleteClassHandler}
					color="error"
				>
					<Icon icon={BaselineDeleteForever} width={30} height={30} />
				</LoadingButton>
			</TableCell>
		</TableRow>
	);
}

//accessCode: "0000"
//coach: "Diana"
//conferenceId: "00000000"
//createdAt: "2021-09-06T20:15:56.106Z"
//creator: "brightspilates@gmail.com"
//duration: "60"
//freeAccess: false
//invitationLink: "add_URL"
//level: "beginer"
//participants: []
//startTime: "2021-09-07T13:49:07.024Z"
//title: "Sample name"
//type: "group"
//updatedAt: "2021-09-07T09:49:17.555Z"
//_id: "613676fceefa9d7c1078746a"

// Online Class
//accessCode: "00000"
//coach: "Диана"
//conferenceId: "5914365968"
//createdAt: "2021-08-09T08:45:21.940Z"
//creator: "brightspilates@gmail.com"
//duration: "30"
//freeAccess: true
//invitationLink: "https://us05web.zoom.us/j/5914365968?pwd=NXgrWjExOVZkdnB0c2hSaWtzSmlSZz09"
//level: "beginer"
//participants: []
//startTime: "2021-08-17T14:00:00.000Z"
//title: "Пилатес Start"
//type: "group"
//updatedAt: "2021-08-15T15:44:00.839Z"
//_id: "6110eb21178e9fa5997d9bc5"
