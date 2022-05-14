import React from "react";
import {
	Box,
	useTheme,
	Container,
	Typography,
	useMediaQuery,
} from "@mui/material";
import MAvatar from "../@material-extend/MAvatar";

import {
	varFadeIn,
	MotionInView,
	varFadeInLeft,
	varFadeInRight,
} from "../animate";

import useIsMountedRef from "../../hooks/useIsMountedRef";

const CoachAvatar = ({ picture, alt, name }) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	const isMountedRef = useIsMountedRef();

	return (
		<Container maxWidth="lg">
			<Box sx={{ position: "relative" }}>
				{isMountedRef.current && (
					<MotionInView variants={isDesktop ? varFadeInLeft : varFadeIn}>
						<MAvatar
							src={`/${picture}`}
							alt={alt}
							sx={{
								position: "absolute",
								top: { xs: -90, md: -150 },
								left: { xs: 70, md: 70 },
								borderWidth: 5,
								borderStyle: "solid",
								borderColor: "common.white",
								// xs и md это размер экрана
								width: { xs: 180, md: 300 },
								height: { xs: 180, md: 300 },
							}}
						/>
					</MotionInView>
				)}

				{isMountedRef.current && (
					<MotionInView variants={isDesktop ? varFadeInRight : varFadeIn}>
						<Typography
							variant="h2"
							sx={{
								position: "absolute",
								//top: { xs: 0, md: 40 },
								//left: { xs: 0, md: 413 },
								top: { xs: 0, md: -66 },
								left: { xs: 0, md: 413 },
							}}
						>
							{name}
						</Typography>
					</MotionInView>
				)}
			</Box>
		</Container>
	);
};

export default CoachAvatar;
