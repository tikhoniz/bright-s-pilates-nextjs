import { useMemo } from "react";
//material
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import { dayMonthYearDate, humanReadableTime } from "../../../utils/time";
// utils
import { findParticipants } from "../../../utils/findParticipants";
//icons
import { Icon } from "@iconify/react";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";
import BaselinePerson from "@iconify/icons-ic/baseline-person";
import NotPaymentIcon from "../../icons/icon_not_payment";
import PaymentIcon from "../../icons/icon_payment";

export default function CompletedClass({ cls, users }) {
	const { coach, type, level, title, duration, startTime, freeAccess } = cls;

	const participants = useMemo(
		() => findParticipants(users, cls),
		[users, cls]
	);

	return (
		<TableRow>
			<TableCell>
				{freeAccess ? (
					<NotPaymentIcon sx={{ height: 30 }} />
				) : (
					<PaymentIcon sx={{ height: 30, minWidth: 30 }} />
				)}
			</TableCell>

			<TableCell>
				<Stack>
					<time dateTime={startTime}>
						{dayMonthYearDate(startTime, "ru-RU")}
					</time>
					<time dateTime={startTime}>
						в {humanReadableTime(startTime, "ru-RU")}
					</time>
				</Stack>
			</TableCell>

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

			<TableCell>{participants.length}</TableCell>

			<TableCell>{duration} минут</TableCell>
		</TableRow>
	);
}
