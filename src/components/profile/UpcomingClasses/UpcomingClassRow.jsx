import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
// material
import { Stack, TableRow, TableCell, Typography, Box } from "@mui/material";
// utils
import {
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../../utils/time";
import { cancelUserGroup } from "../../../helpers/api/api-classes";
import { getCurrentTime, getEventTime } from "../../../utils/time";
// components
import JoinButton from "../../schedule/buttons/JoinButton";
import ActionButton from "../../schedule/buttons/ActionButton";
//icons
import { Icon } from "@iconify/react";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";
import BaselinePerson from "@iconify/icons-ic/baseline-person";
import NotPaymentIcon from "../../icons/icon_not_payment";
import PaymentIcon from "../../icons/icon_payment";
import renderMessage from "../../../helpers/renderMessage";
import useUser from "../../../hooks/useUser";
import { useSWRConfig } from "swr";
import SkeletonLoad from "../../UI/skeleton/Skeleton";

//---------------------------------------------------------------------------------
const TIME_UNTIL_START_TIMER = 86400000;
const buttonWidth = 165;
const xsButtonWidth = 130;
const buttonHeight = 44;
//---------------------------------------------------------------------------------

const UpcomingClassRow = ({ cls, router, isMobile }) => {
	const [isExpired, setExpired] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { mutate } = useSWRConfig();

	const { user, isLoading, isError } = useUser();
	const { _id: userId, zoomApp, email } = user;

	useEffect(() => {
		const expired = cancelTimeClassExpired < currentTime;
		// если есть запись и время отмены меньше текущего времени
		if (expired) {
			setExpired(true);
		}
		// время до начала тренировки
		const t = startTimeClass - currentTime - delayCancelTime;

		if (!expired && t < TIME_UNTIL_START_TIMER) {
			const timer = setTimeout(() => {
				setExpired(true);
			}, t);

			return () => {
				// Таймер удаляется в случае отмены тренировки
				clearTimeout(timer);
			};
		}
	}, [isExpired]);

	const {
		_id: classId,
		type,
		coach,
		title,
		avatar,
		startTime,
		freeAccess,
		invitationLink,
	} = cls;

	// возвращает в милисекундах
	const delayCancelTime = process.env.delay_cancel_online_class * 60 * 1000;
	const startTimeClass = getEventTime(startTime);
	const currentTime = getCurrentTime();

	// время после которого нельзя отменить тренировку
	const cancelTimeClassExpired =
		getEventTime(startTime) - process.env.delay_cancel_online_class * 60 * 1000;

	async function cancelClassHandler() {
		setSubmitting(true);
		// проверка на возможность отмены тренировки не более чем за час до начала
		if (cancelTimeClassExpired <= getCurrentTime()) {
			setExpired(true);
			setSubmitting(false);
			return;
		}

		const response = await cancelUserGroup(userId, classId);
		// проверить на ошибку
		if (!response.ok) {
			setSubmitting(false);

			enqueueSnackbar(renderMessage(response.message), {
				autoHideDuration: 2000,
				variant: "warning",
			});
			return;
		}

		mutate(`/api/classes/user/${email}`);
		mutate(`/api/users/${email}`);
	}

	if (isLoading)
		return (
			<TableRow>
				<TableCell align="center" colSpan={"100%"} padding="none">
					<SkeletonLoad variant="rectangular" height={45} />
				</TableCell>
			</TableRow>
		);

	if (isError)
		return (
			<TableRow>
				<TableCell align="center" colSpan={"100%"}>
					'Не удалось загрузить данные'
				</TableCell>
			</TableRow>
		);

	return (
		<TableRow>
			{!isMobile && (
				<TableCell align="center">
					{freeAccess ? (
						<NotPaymentIcon sx={{ height: 43, minWidth: 30 }} />
					) : (
						<PaymentIcon sx={{ height: 43, minWidth: 30 }} />
					)}
				</TableCell>
			)}

			<TableCell>
				<Stack>
					<Typography>
						<time dateTime={startTime}>
							{humanReadableWeekday(startTime, "ru-RU")}
						</time>
					</Typography>

					<Typography variant="h4">
						<time
							dateTime={startTime}
							style={{
								whiteSpace: "nowrap",
							}}
						>
							{humanReadableTime(startTime, "ru-RU")}
						</time>
					</Typography>

					<Typography variant="h5">
						<time
							dateTime={startTime}
							style={{
								whiteSpace: "nowrap",
							}}
						>
							{humanReadableDate(startTime, "ru-RU")}
						</time>
					</Typography>
				</Stack>
			</TableCell>

			<TableCell>
				<Icon
					icon={type !== "personal" ? BaselineGroups : BaselinePerson}
					width={30}
					height={30}
				/>
			</TableCell>

			{!isMobile && <TableCell>{title}</TableCell>}

			{!isMobile && (
				<TableCell>
					<Stack direction="row" alignItems="center" spacing={2}>
						{/*//- включить в дальнейшем */}
						{/*<MAvatar alt={coach} src={avatar} />*/}
						<Typography variant="subtitle2">{coach}</Typography>
					</Stack>
				</TableCell>
			)}

			<TableCell
				sx={{
					width: { xs: xsButtonWidth + 40, md: buttonWidth + 40 },

					position: "relative",
				}}
			>
				{isExpired && (
					<JoinButton
						sx={{
							width: { xs: xsButtonWidth, md: buttonWidth },

							height: { xs: buttonHeight, md: "inherit" },
						}}
						classId={cls._id}
						startTime={cls.startTime}
						isZoomApp={zoomApp}
						router={router}
					/>
				)}

				{!isExpired && (
					<ActionButton
						loading={isSubmitting}
						onClick={cancelClassHandler}
						label="Отменить"
						variant="contained"
						sx={{
							width: { xs: xsButtonWidth, md: buttonWidth },
							height: { xs: buttonHeight, md: "inherit" },
						}}
					/>
				)}
			</TableCell>
		</TableRow>
	);
};

export default UpcomingClassRow;
