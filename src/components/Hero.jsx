import React from "react";
// material
import { Typography, styled, Stack, Box } from "@mui/material";
// animation
import { motion } from "framer-motion";
import { varWrapEnter, varFadeInUp, varFadeInDown } from "./animate";

const RootStyle = styled(motion.div)(({ theme }) => ({
	top: 0,
	left: 0,
	width: "100%",
	height: "100vh",
	display: "flex",
	position: "absolute",
	backgroundColor: theme.palette.grey[400],
}));

const ContentStyle = styled((props) => <Stack {...props} />)(({ theme }) => ({
	zIndex: 9,
	marginLeft: 40,
	justifyContent: "center",
	textAlign: "left",
	[theme.breakpoints.up("md")]: {
		margin: "auto",
		alignItems: "center",
	},
}));

const Hero = () => {
	return (
		<RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
			<ContentStyle>
				<motion.div variants={varFadeInDown}>
					<Box
						sx={
							{
								//display: "flex",
								//alignItems: "center",
								//textAlign: "center",
							}
						}
					>
						<Typography
							component="h2"
							variant="inherit"
							gutterBottom
							sx={{
								color: "primary.main",
								//color: "#028dd1",
								fontSize: { xs: "4vw", md: "2vw" },
								lineHeight: 2.2,
								letterSpacing: "1vw",
								whiteSpace: "nowrap",
								textTransform: "uppercase",
								paddingLeft: "2vw",
								fontWeight: 300,
							}}
						>
							Online pilates studio
						</Typography>
					</Box>
				</motion.div>

				<motion.div variants={varFadeInUp}>
					<Typography
						component="h3"
						variant="inherit"
						sx={{
							color: "common.white",
							//color: "#feec00",
							textTransform: "uppercase",
							fontSize: { xs: "12vw", sm: "9vw", md: "5vw" },
							fontWeight: 400,
							letterSpacing: "2vw",
							lineHeight: 1,
							paddingLeft: "2vw",
						}}
					>
						Bright's Pilates
					</Typography>
				</motion.div>
			</ContentStyle>
		</RootStyle>
	);
};

export default Hero;
