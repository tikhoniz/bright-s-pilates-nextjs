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
	Stack,
} from "@mui/material";
import { useSnackbar } from "notistack";
// utils
import { changeZoomMode } from "../../helpers/api/api-users";
// animation
import { MotionInView, varFadeIn } from "../animate";
// icons
import InfoIcon from "../../../src/components/icons/info-icon";
import zoomIcon from "../../../public/svg/zoom-icon.svg";

import useUser from "../../hooks/useUser";

import { Icon } from "@iconify/react";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";

const ZoomToggle = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { user, isValidating } = useUser();
	const { mutate } = useSWRConfig();

	const [isSubmitting, setSubmitting] = useState(false);

	const { _id: userId, zoomApp, email } = user || {};

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
			<Card sx={{ pt: 4, pb: 2, px: 2, position: "relative" }}>
				<Tooltip
					title={
						<Typography
							variant="subtitle1"
							sx={{ position: "relative", m: 1, textAlign: "justify" }}
						>
							Если данная опция активирована, тренировка будет проходить в
							приложении &nbsp;
							<Link
								underline="always"
								href="https://zoom.us/download"
								target="_blank"
								variant="h4"
								color="#094c9e"
								sx={{
									position: "absolute",
									top: "40px",
									left: "99px",
								}}
							>
								zoom
							</Link>
						</Typography>
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
							right: "8px",
							top: "8px",
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
						<Box
							component="img"
							src="/svg/zoom_full-icon.svg"
							sx={{
								width: "120px",
								height: "60px",
								opacity: !zoomApp && 0.3,
							}}
						/>
					}
					sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
				/>
			</Card>
		</MotionInView>
	);
};

export default ZoomToggle;
