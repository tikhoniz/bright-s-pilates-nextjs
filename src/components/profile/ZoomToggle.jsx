import { useEffect, useState } from "react";
// hooks
import { useSWRConfig } from "swr";
// material
import {
	Box,
	Card,
	Fade,
	Link,
	Switch,
	Tooltip,
	Typography,
	FormControlLabel,
	CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
// utils
import { changeZoomMode } from "../../helpers/api/api-users";
// animation
import { MotionInView, varFadeIn } from "../animate";
// icons
import InfoIcon from "../../../src/components/icons/info-icon";
import useUser from "../../hooks/useUser";

const ZoomToggle = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { user, isValidating } = useUser();
	const { mutate } = useSWRConfig();

	const [isSubmitting, setSubmitting] = useState(false);

	const { _id: userId, zoomApp, email } = user;

	useEffect(() => {
		!isValidating && setSubmitting(false);
	}, [isValidating]);

	const toogleModeHandler = async (mode) => {
		setSubmitting(true);

		const response = await changeZoomMode(userId, mode);

		if (!response.ok) {
			enqueueSnackbar(response.message, {
				variant: "error",
			});
			setSubmitting(false);
			return;
		}

		mutate(`/api/users/${email}`);
	};

	return (
		<MotionInView variants={varFadeIn}>
			<Card sx={{ pt: "46px", pb: 2, px: 2, position: "relative" }}>
				<Tooltip
					title={
						<Box
							sx={{
								flexShrink: 0,
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
							}}
						>
							<Typography variant="subtitle1" component="p" align="center">
								Если данная опция активирована, тренировка будет проходить в
								приложении
								<Box
									component="img"
									alt="zoom icon"
									src={"/svg/zoom-icon.svg"}
									sx={{ height: 24, width: 24, ml: 1, mr: "2px", mb: "4px" }}
								/>
								Zoom
							</Typography>
							<Link
								underline="always"
								href="https://zoom.us/download"
								target="_blank"
								sx={{ typography: "subtitle1" }}
							>
								Скачать Zoom
							</Link>
						</Box>
					}
					arrow
					placement="top"
					TransitionComponent={Fade}
					TransitionProps={{ timeout: 300 }}
					leaveDelay={1000}
				>
					<Box
						sx={{
							position: "absolute",
							left: "148px",
							top: "16px",
							cursor: "help",
						}}
					>
						<InfoIcon
							width={24}
							height={24}
							color="#0e71eb"
							sx={{ "&:hover": { opacity: 0.6 } }}
						/>
					</Box>
				</Tooltip>

				<FormControlLabel
					labelPlacement="start"
					control={
						<>
							<Switch
								onChange={(event) => toogleModeHandler(event.target.checked)}
								checked={zoomApp || false}
								color="info"
							/>
							{isSubmitting && (
								<CircularProgress color="info" size={28} thickness={5} />
							)}
						</>
					}
					label={
						<Typography
							noWrap
							variant="subtitle2"
							sx={{ mb: 0.5, opacity: !zoomApp && 0.3 }}
						>
							Приложение Zoom
						</Typography>
					}
					sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
				/>
			</Card>
		</MotionInView>
	);
};

export default ZoomToggle;
