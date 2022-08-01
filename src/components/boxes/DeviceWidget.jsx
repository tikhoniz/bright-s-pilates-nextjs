//next
import { useRouter } from "next/router";
import Image from "next/image";
// next
import NextLink from "next/link";
// material
import { alpha, useTheme, styled, Stack } from "@mui/material";
import {
	Box,
	Grid,
	Button,
	Container,
	Typography,
	useMediaQuery,
} from "@mui/material";
//icons
//import SvgIconStyle from "../SvgIconStyle";
//// animation
//import {
//	varFadeInUp,
//	MotionInView,
//	varFadeIn,
//	varFadeInLeft,
//	varFadeInRight,
//} from "../animate";

//import classes from "./InfoBox.module.scss";

import mainPhoto from "../../../public/images/desktop-laptop-tablet-phone.png";

import SvgIconStyle from "../SvgIconStyle";

const RootStyle = styled(Box)(({ theme }) => ({
	borderRadius: 2,
	maxWidth: 1480,
	margin: "0 auto",
	//boxShadow: shadow,
	//marginTop: theme.spacing(15),
	//textAlign: "center",
	padding: theme.spacing(2),

	////paddingBottom: theme.spacing(8),
	[theme.breakpoints.up("md")]: {
		padding: theme.spacing(8),

		//paddingBottom: theme.spacing(15),
	},
	////  lg: 1200, если экран больше то работает textAlign: "left",
	//// иначе работает textAlign: "center",
	//[theme.breakpoints.up("lg")]: {
	//	textAlign: "left",
	//	paddingTop: theme.spacing(20),
	//	//paddingBottom: theme.spacing(20),
	//},
}));

const DeviceWidget = () => {
	const theme = useTheme();
	//const router = useRouter();
	//const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	//const isLight = theme.palette.mode === "light";
	//const shadow = `-40px 40px 80px ${alpha(
	//	isLight ? theme.palette.grey[500] : theme.palette.common.black,
	//	0.48
	//)}`;

	//const slideImage = leftSide ? varFadeInRight : varFadeInLeft;
	//const slideText = leftSide ? varFadeInLeft : varFadeInRight;

	return (
		<RootStyle>
			<Typography
				variant="h2"
				sx={{
					textTransform: "uppercase",
					textAlign: "center",

					//[theme.breakpoints.down("md")]: {
					p: 10,
					//},
				}}
			>
				Пилатес студия онлайн
			</Typography>

			<Image
				//alt={alt}
				src={mainPhoto}
				placeholder="blur"
				layout="responsive"
				objectFit="cover"
				//className={classes.infoBoxImg}
			/>

			<Stack alignItems="center">
				<NextLink href="/schedule" passHref>
					<Button
						variant="outlined"
						fullWidth
						//onClick={() => router.push("/schedule")}
						size="large"
						endIcon={<SvgIconStyle src="/svg/calendar.svg" />}
						sx={{
							maxWidth: "265px",
							marginTop: 8,
							//[theme.breakpoints.down("md")]: {
							//marginTop: 3,
							//},
						}}
					>
						Расписание
					</Button>
				</NextLink>
			</Stack>
		</RootStyle>
	);
};

export default DeviceWidget;
