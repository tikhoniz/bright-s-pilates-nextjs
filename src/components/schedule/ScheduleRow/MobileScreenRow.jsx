import React from "react";

// material
import {
	Stack,
	TableRow,
	TableCell,
	Typography,
	Skeleton,
} from "@mui/material";
// extend
import MHidden from "../../@material-extend/MHidden";
// utils
import { dayMonthYearDate, humanReadableTime } from "../../../utils/time";
// components
import Label from "../../Label";
import JoinButton from "../buttons/JoinButton";
import SingupButton from "../buttons/SingupButton";
import ActionButton from "../buttons/ActionButton";
// icons
import { Icon } from "@iconify/react";
import MAvatar from "../../@material-extend/MAvatar";
import clockOutline from "@iconify/icons-eva/clock-outline";

//----------------------------------------------------------------
const buttonWidth = 125;
const buttonHeight = 44;
//----------------------------------------------------------------

const MobileScreenRow = ({
	cls,
	user,
	router,
	isExpired,
	isInvolved,
	isSubmitting,
	registerForClassHandler,
	cancelClassHandler,
}) => {
	const {
		_id: classId,
		coach,
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
		<TableRow>
			<TableCell>
				<Label
					variant={isInvolved ? "ghost" : "outlined"}
					color={
						(freeAccess && "success") || (!freeAccess && "warning") || "error"
					}
				>
					<Typography variant="button">
						{freeAccess ? "бесплатный" : "платный"}
					</Typography>
				</Label>

				<Stack padding={1}>
					<time
						dateTime={startTime}
						style={{ fontSize: "18px", fontWeight: 900 }}
					>
						{humanReadableTime(startTime, "ru-RU")}
					</time>
					<time
						dateTime={startTime}
						style={{ fontSize: "16px", fontWeight: 500 }}
					>
						{dayMonthYearDate(startTime)}
					</time>
				</Stack>

				<Stack direction="row" alignItems="center" paddingLeft="8px">
					<Icon width={14} height={14} icon={clockOutline} />

					<Typography variant="caption" align="center" sx={{ ml: "4px" }}>
						{duration} минут
					</Typography>
				</Stack>
			</TableCell>

			<TableCell sx={{ maxWidth: 300, display: { xs: "none", sm: "block" } }}>
				{title}
			</TableCell>

			<TableCell
				sx={{
					position: "relative",
				}}
			>
				<Stack
					alignItems="center"
					spacing={2}
					direction="column"
					minWidth={150}
					minHeight={100}
				>
					<Stack direction="row" alignItems="center" spacing={2}>
						{/*<MHidden width="smDown">*/}
						<MAvatar
							alt={coach}
							src={avatar}
							onClick={() => router.push(urlCoach)}
							sx={{ cursor: "pointer" }}
						/>
						{/*</MHidden>*/}
						<Typography variant="subtitle2">{coach}</Typography>
					</Stack>

					<Skeleton
						variant="rectangular"
						animation="wave"
						sx={{
							position: "absolute",
							top: 60,
							zIndex: "-1",
							paddingTop: "44px",
							borderRadius: "8px",
							bgcolor: "grey.250",
							width: buttonWidth,
						}}
					/>

					{!user.email && (
						<SingupButton
							sx={{ width: buttonWidth, height: buttonHeight }}
							router={router}
						/>
					)}

					{isExpired && !!isInvolved && (
						<JoinButton
							sx={{ width: buttonWidth, height: buttonHeight }}
							classId={cls._id}
							startTime={cls.startTime}
							isZoomApp={zoomApp}
							router={router}
						/>
					)}
					{user.email && !isExpired && (
						<ActionButton
							loading={isSubmitting}
							onClick={
								isInvolved ? cancelClassHandler : registerForClassHandler
							}
							label={isInvolved ? "Отменить" : "Запись"}
							variant={isInvolved ? "contained" : "outlined"}
							sx={{
								width: buttonWidth,
								height: buttonHeight,
								backgroundColor: !isInvolved && "#fff",
								"&:hover": { backgroundColor: !isInvolved && "grey.100" },
							}}
						/>
					)}
				</Stack>
			</TableCell>
		</TableRow>
	);
};

export default MobileScreenRow;
