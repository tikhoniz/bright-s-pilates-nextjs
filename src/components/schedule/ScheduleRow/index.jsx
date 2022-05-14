import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
// hooks
import { useSWRConfig } from "swr";
// utils
import renderMessage from "../../../helpers/renderMessage";
import { getCurrentTime, getEventTime } from "../../../utils/time";
import {
	cancelUserGroup,
	registerUserGroup,
} from "../../../helpers/api/api-classes";
// icons
import MobileScreenRow from "./MobileScreenRow";
import DesktopScreenRow from "./DesktopScreenRow";

//---------------------------------------------------------------------------------
const TIME_UNTIL_START_TIMER = 86400000;
//---------------------------------------------------------------------------------

export default function ScheduleRow({ cls, user, isDesktop, router }) {
	const { _id: classId, startTime, freeAccess } = cls;
	const { _id: userId, email } = user;

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [isExpired, setExpired] = useState(false);
	const [isInvolved, setInvolved] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);
	const { mutate } = useSWRConfig();

	//- возвращает в милисекундах
	const delayCancelTime = process.env.delay_cancel_online_class * 60 * 1000;
	const startTimeClass = getEventTime(startTime);
	const currentTime = getCurrentTime();
	const cancelTimeClassExpired = startTimeClass - delayCancelTime;

	// проверяет запись на тренировку
	useEffect(() => {
		user?.groupList?.some((cls) => cls === classId) && setInvolved(true);
	}, [user?.groupList]);

	// если время тренировки не истекло устанавливает таймер
	useEffect(() => {
		const expired = cancelTimeClassExpired < currentTime;
		// если есть запись и время отмены меньше текущего времени
		if (isInvolved && expired) {
			setExpired(true);
		}
		// время до начала тренировки
		const t = startTimeClass - currentTime - delayCancelTime;

		if (isInvolved && !expired && t < TIME_UNTIL_START_TIMER) {
			const timer = setTimeout(() => {
				setExpired(true);
			}, t);

			return () => {
				// Таймер удаляется в случае отмены тренировки
				clearTimeout(timer);
			};
		}
	}, [isExpired, isInvolved]);

	// записывает на тренировку
	const registerForClassHandler = async () => {
		setSubmitting(true);

		const response = await registerUserGroup(userId, classId);

		if (!response.ok) {
			enqueueSnackbar(renderMessage(response.message, closeSnackbar), {
				autoHideDuration: 4000,
				variant: "warning",
			});
			response.message === "alreadyParticipant" && setInvolved(true);
			setSubmitting(false);
			return;
		}

		mutate(`/api/users/${email}`);
		mutate(`/api/classes/groups/user/${email}`);

		setInvolved(true);
		setSubmitting(false);
	};

	// удаление записи на тренировку
	const cancelClassHandler = async () => {
		setSubmitting(true);
		// проверка на возможность отмены тренировки не более чем за час до начала
		if (cancelTimeClassExpired <= getCurrentTime()) {
			setExpired(true);
			setSubmitting(false);
			return;
		}

		const response = await cancelUserGroup(userId, classId);

		if (!response.ok) {
			enqueueSnackbar(renderMessage(response.message), {
				autoHideDuration: 2000,
				variant: "warning",
			});
			return;
		}

		mutate(`/api/classes/groups/user/${email}`);
		mutate(`/api/users/${email}`);

		setInvolved(false);
		setSubmitting(false);
	};

	if (!isDesktop) {
		return (
			<MobileScreenRow
				cls={cls}
				user={user}
				router={router}
				isExpired={isExpired}
				isInvolved={isInvolved}
				isSubmitting={isSubmitting}
				registerForClassHandler={registerForClassHandler}
				cancelClassHandler={cancelClassHandler}
			/>
		);
	} else {
		return (
			<DesktopScreenRow
				cls={cls}
				user={user}
				router={router}
				isExpired={isExpired}
				isInvolved={isInvolved}
				isSubmitting={isSubmitting}
				registerForClassHandler={registerForClassHandler}
				cancelClassHandler={cancelClassHandler}
			/>
		);
	}
}

// Online Class
//accessCode: "0000"
//avatar: "/images/diana-coach-photo.jpg"
//coach: "Диана"
//conferenceId: "00000000"
//createdAt: "2021-10-29T12:39:35.467Z"
//creator: "brightspilates@gmail.com"
//duration: "60"
//freeAccess: false
//invitationLink: "add_URL"
//level: "beginer"
//participants: []
//startTime: "2021-10-30T12:39:35.000Z"
//title: "Sample name"
//type: "group"
//updatedAt: "2021-10-29T12:39:51.262Z"
//urlCoach: "/coaches/diana-head-coach"
//_id: "617beb87b769a54ca8d0d5c5"
