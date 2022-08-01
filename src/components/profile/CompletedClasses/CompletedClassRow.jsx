import React from "react";
// material
import { Stack, TableRow, TableCell, Typography } from "@mui/material";
// utils
import {
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../../utils/time";
// icons
import PaymentIcon from "../../icons/icon_payment";
import NotPaymentIcon from "../../icons/icon_not_payment";
// extend
import MAvatar from "../../@material-extend/MAvatar";

const ComletedClassRow = ({ cls }) => {
	const { coach, title, avatar, startTime, freeAccess } = cls;

	return (
		<TableRow>
			<TableCell>
				<Stack sx={{ whiteSpace: "nowrap" }}>
					<time dateTime={startTime}>
						{humanReadableWeekday(startTime, "ru-RU")}
					</time>
					<time dateTime={startTime}>
						{humanReadableDate(startTime, "ru-RU")}
					</time>
					<time dateTime={startTime}>
						в {humanReadableTime(startTime, "ru-RU")}
					</time>
				</Stack>
			</TableCell>

			<TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
				{title}
			</TableCell>

			<TableCell>
				<Stack direction="row" alignItems="center" spacing={2}>
					<MAvatar
						alt={coach}
						src={avatar}
						sx={{ display: { xs: "none", sm: "block" } }}
					/>
					<Typography variant="subtitle2">{coach}</Typography>
				</Stack>
			</TableCell>

			<TableCell>
				{freeAccess ? (
					<NotPaymentIcon sx={{ height: 30 }} />
				) : (
					<PaymentIcon sx={{ height: 30, minWidth: 30 }} />
				)}
			</TableCell>
		</TableRow>
	);
};

export default ComletedClassRow;
