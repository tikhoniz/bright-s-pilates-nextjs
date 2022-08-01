import React from "react";
// material
import {
	Box,
	Stack,
	Tooltip,
	Skeleton,
	TableRow,
	TableCell,
	Typography,
} from "@mui/material";
import { Zoom } from "@mui/material";
//helpers
import {
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../../utils/time";
// components
import Label from "../../Label";
import JoinButton from "../buttons/JoinButton";
import ActionButton from "../buttons/ActionButton";
import SingupButton from "../buttons/SingupButton";
// icons
import MAvatar from "../../@material-extend/MAvatar";

import { styled, alpha } from "@mui/material";

//----------------------------------------------------------------
const buttonWidth = 165;

const TableRowStyle = styled(TableRow)(({ theme }) => ({
	//backgroundColor: "#fff",
	//transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	//boxShadow: "inset 0 12px 10px 0 rgba(0,0,0,0.15)",
	//"0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)",

	//overflow: "hidden",
	//border: "23px solid red",
	borderRadius: "16px",
	//paddingBottom: 10,
	//margin: 10,

	"&:hover": {
		//zIndex: 999,
		//position: "relative",
		//boxShadow: theme.customShadows.z24,
		transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

		boxShadow: "inset 0 0 12px 0 rgb(145 158 171 / 24%)",
		//"& .showActions": { opacity: 1 },
	},
}));

//----------------------------------------------------------------

const DesktopScreenRow = ({
	cls,
	user,
	router,
	isExpired,
	isInvolved,
	isSubmitting,
	registersClassHandler,
	cancelClassHandler,
}) => {
	const {
		_id: classId,
		coach,
		level,
		title,
		avatar,
		urlCoach,
		duration,
		startTime,
		freeAccess,
		invitationLink,
	} = cls;

	const { zoomApp } = user;
	return (
		<TableRowStyle>
			<TableCell>
				<Tooltip
					disableHoverListener={!isInvolved}
					arrow
					placement="top"
					TransitionComponent={Zoom}
					title={"Вы участник этой тренировки"}
				>
					<Box>
						<Label
							variant={isInvolved ? "ghost" : "outlined"}
							height="80px"
							sx={{ width: { xs: "100px", lg: "155px" } }}
							color={
								(freeAccess && "success") ||
								(!freeAccess && "warning") ||
								"error"
							}
						>
							<Stack alignItems="center">
								<Typography variant="h5">
									{freeAccess ? "бесплатный" : "платный"}
								</Typography>

								<Typography
									variant="h5"
									sx={{ display: { xs: "none", lg: "block" } }}
								>
									&nbsp;класс
								</Typography>
							</Stack>
						</Label>
					</Box>
				</Tooltip>
			</TableCell>

			<TableCell>
				<Stack>
					<Typography>
						<time dateTime={startTime}>
							{humanReadableWeekday(startTime, "ru-RU")}
						</time>
					</Typography>

					<Typography variant="h4">
						<time dateTime={startTime}>
							{humanReadableTime(startTime, "ru-RU")}
						</time>
					</Typography>

					<Typography variant="h5">
						<time dateTime={startTime}>
							{humanReadableDate(startTime, "ru-RU")}
						</time>
					</Typography>
				</Stack>
			</TableCell>

			<TableCell sx={{ maxWidth: 300 }}>{title}</TableCell>

			<TableCell>
				{(level === "beginer" && "начальный") ||
					(level === "intermediate" && "средний") ||
					(level === "advance" && "продвинутый")}
			</TableCell>

			<TableCell>{duration} минут</TableCell>

			<TableCell>
				<Stack direction="row" alignItems="center" spacing={2}>
					<MAvatar
						alt={coach}
						src={avatar}
						onClick={() => router.push(urlCoach)}
						sx={{ cursor: "pointer" }}
					/>
					<Typography variant="subtitle2">{coach}</Typography>
				</Stack>
			</TableCell>

			<TableCell
				sx={{
					minWidth: 180,
					width: buttonWidth + 40,
					position: "relative",
				}}
			>
				{/*<Skeleton
					variant="rectangular"
					animation="wave"
					sx={{
						position: "absolute",
						top: 31,
						zIndex: "-1",
						paddingTop: "36px",
						borderRadius: "8px",
						bgcolor: "grey.250",
						width: buttonWidth,
					}}
				/>*/}

				{!user.email && (
					<SingupButton
						sx={{
							width: buttonWidth,
						}}
						router={router}
					/>
				)}

				{isExpired && !!isInvolved && (
					<JoinButton
						sx={{ width: buttonWidth }}
						classId={cls._id}
						startTime={cls.startTime}
						isZoomApp={zoomApp}
						router={router}
					/>
				)}

				{user.email && !isExpired && (
					<ActionButton
						loading={isSubmitting}
						onClick={isInvolved ? cancelClassHandler : registersClassHandler}
						label={isInvolved ? "Отменить" : "Запись"}
						variant={isInvolved ? "contained" : "outlined"}
						sx={{
							width: buttonWidth,
							backgroundColor: !isInvolved && "#fff",
							"&:hover": { backgroundColor: !isInvolved && "grey.100" },
						}}
					/>
				)}
			</TableCell>
		</TableRowStyle>
	);
};

export default DesktopScreenRow;
