import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
// material
import { Typography, Box, Stack } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// utils
import renderMessage from "../../../helpers/renderMessage";
import { getCurrentTime, getEventTime } from "../../../utils/time";
// icons
import { Icon } from "@iconify/react";
import videoOutline from "@iconify/icons-eva/video-outline";
import useGroupClass from "../../../hooks/useGroupClass";

const JoinButton = ({ sx, classId, startTime, router, isZoomApp }) => {
	const { cls, isLoading, isError } = useGroupClass(classId);

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	const [minutes, setMins] = useState(null);
	const [seconds, setSecs] = useState(null);
	const [joinToClass, setJoinToClass] = useState(false);
	const [isSubmitting, setSubmitting] = useState(false);

	const { enqueueSnackbar } = useSnackbar();

	const startTimeClass = getEventTime(startTime);

	useEffect(() => {
		const timerBeforeJoin = setInterval(function () {
			// время до начала тренировки
			const t = startTimeClass - getCurrentTime();
			// если время до начала тренировки больше чем 5мин показывает
			// таймер обратного отсчета, если меньше, то "присоединится"
			if (t >= 5 * 60 * 1000) {
				let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
				let seconds = Math.floor((t % (1000 * 60)) / 1000);
				setMins(("0" + minutes).slice(-2));
				setSecs(("0" + seconds).slice(-2));
			} else {
				setJoinToClass(true);
				return () => {
					clearTimeout(timerBeforeJoin);
				};
			}
		}, 1000);

		return () => {
			clearTimeout(timerBeforeJoin);
		};
	}, []);

	const joinToClassHandler = async () => {
		setSubmitting(true);

		// если с момента начала прошло меньше 10 минут
		if (startTimeClass + 10 * 60 * 1000 < getCurrentTime()) {
			// если с момента начала прошло больше 10 минут
			enqueueSnackbar(renderMessage("cannotJoin"), {
				variant: "error",
			});
			router.reload();
			return;
		}

		if (isError) {
			enqueueSnackbar(isError, {
				variant: "error",
			});
			return;
		}
		// the user has a choice between the SDK and the Zoom application
		// always used Zoom app on mobile screen
		if (isZoomApp || !isDesktop) {
			//window.open(response?.groupClass?.invitationLink, "_blank");
			window.open(cls?.invitationLink, "_blank");

			setSubmitting(false);
			return;
		}

		router.push(`/zoom/${classId}`);
	};

	return (
		<>
			{joinToClass && !isLoading ? (
				<LoadingButton
					variant="contained"
					color={joinToClass ? "info" : "warning"}
					endIcon={
						joinToClass && <Icon icon={videoOutline} width={24} height={24} />
					}
					sx={{ ...sx }}
					loading={isSubmitting}
					onClick={joinToClassHandler}
				>
					Начать
				</LoadingButton>
			) : (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						whiteSpace: "nowrap",
						width: "100%",
					}}
				>
					{seconds && (
						<Stack direction={{ xs: "column" }} alignItems="center">
							<Typography
								variant="subtitle1"
								sx={{
									color: "text.secondary",
									mr: 0.5,
								}}
							>
								Начало через:
							</Typography>

							<Typography
								variant="h5"
								sx={{ color: "text.secondary", minWidth: 45 }}
							>
								<span>{minutes || "__"}</span>:<span>{seconds || "__"}</span>
							</Typography>
						</Stack>
					)}
				</Box>
			)}
		</>
	);
};

export default JoinButton;
