//next
import { useRouter } from "next/router";
import Image from "next/image";
// material
import { alpha, useTheme, styled, Button } from "@mui/material";
import { Box, Grid, Container, Typography, useMediaQuery } from "@mui/material";
//icons
import SvgIconStyle from "../SvgIconStyle";
// animation
import {
	varFadeInUp,
	MotionInView,
	varFadeIn,
	varFadeInLeft,
	varFadeInRight,
} from "../animate";

import classes from "./InfoBox.module.scss";

const RootStyle = styled("div")(({ theme }) => ({
	textAlign: "center",
	paddingTop: theme.spacing(8),
	//paddingBottom: theme.spacing(8),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(15),
		//paddingBottom: theme.spacing(15),
	},
	//  lg: 1200, если экран больше то работает textAlign: "left",
	// иначе работает textAlign: "center",
	[theme.breakpoints.up("lg")]: {
		textAlign: "left",
		paddingTop: theme.spacing(20),
		//paddingBottom: theme.spacing(20),
	},
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(5),
	minWidth: 245,

	[theme.breakpoints.up("sm")]: {
		marginTop: theme.spacing(6),
		fontSize: 18,
	},
	[theme.breakpoints.up("md")]: {
		minWidth: 200,
		marginTop: theme.spacing(7),
		fontSize: 22,
	},
	[theme.breakpoints.up("lg")]: {
		marginTop: theme.spacing(10),
		fontSize: 24,
	},
	[theme.breakpoints.up("xl")]: {
		marginTop: theme.spacing(12),
		fontSize: 28,
	},
}));

const InfoBox = ({ leftSide, image, alt, head, text, btnTitle, url, icon }) => {
	const theme = useTheme();
	const router = useRouter();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	const isLight = theme.palette.mode === "light";
	const shadow = `-40px 40px 80px ${alpha(
		isLight ? theme.palette.grey[500] : theme.palette.common.black,
		0.48
	)}`;

	const slideImage = leftSide ? varFadeInRight : varFadeInLeft;
	const slideText = leftSide ? varFadeInLeft : varFadeInRight;

	return (
		<RootStyle>
			<Container maxWidth="xl">
				<Grid container spacing={5} direction={leftSide && "row-reverse"}>
					<Grid item xs={12} lg={7}>
						<MotionInView variants={isDesktop ? slideImage : varFadeIn}>
							<Box
								sx={{
									borderRadius: 2,
									boxShadow: shadow,
								}}
							>
								<Image
									alt={alt}
									src={image}
									placeholder="blur"
									layout="responsive"
									objectFit="cover"
									className={classes.infoBoxImg}
								/>
							</Box>
						</MotionInView>
					</Grid>

					<Grid item xs={12} lg={5}>
						<MotionInView variants={isDesktop ? slideText : varFadeIn}>
							<Typography
								variant="h2"
								sx={{ mb: 3, textTransform: "uppercase" }}
							>
								{head}
							</Typography>
						</MotionInView>

						<MotionInView variants={isDesktop ? slideText : varFadeIn}>
							<Typography
								sx={{
									color: "text.secondary",
									fontSize: { xs: "1.4rem", md: "2rem" },
									//color: (theme) =>
									//	theme.palette.mode === "light"
									//		? "text.secondary"
									//		: "common.white",
								}}
							>
								{text}
							</Typography>
						</MotionInView>

						<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
							<ButtonStyle
								variant="outlined"
								onClick={() => router.push(url)}
								size="large"
								endIcon={
									<SvgIconStyle
										src={icon}
										sx={{
											width: { xs: 18, sm: 22, md: 24, lg: 28 },
											height: { xs: 18, sm: 22, md: 24, lg: 28 },
										}}
									/>
								}
							>
								{btnTitle}
							</ButtonStyle>
						</MotionInView>
					</Grid>
				</Grid>
			</Container>
		</RootStyle>
	);
};

export default InfoBox;
