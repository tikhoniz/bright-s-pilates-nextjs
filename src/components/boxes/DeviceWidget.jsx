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

const ButtonStyle = styled(Button)(({ theme }) => ({
	minWidth: 245,
	marginTop: theme.spacing(5),
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

const DeviceWidget = () => {
	return (
		<Container maxWidth="xl">
			<Typography
				component="h2"
				sx={{
					textTransform: "uppercase",
					textAlign: "center",
					fontWeight: 600,

					fontSize: {
						xs: "2rem",
						sm: "3rem",
						md: "3.5rem",
						lg: "4rem",
						xl: "5rem",
					},
					py: { xs: 3, sm: 5, md: 6, lg: 7, xl: 8 },
				}}
			>
				Пилатес студия онлайн
			</Typography>

			<Box
				sx={{
					mx: { xs: 1, sm: 3, md: 8, lg: 20 },
				}}
			>
				<Image
					//alt={alt}
					src={mainPhoto}
					placeholder="blur"
					layout="responsive"
				/>
			</Box>

			<Stack alignItems="center">
				<NextLink href="/schedule" passHref>
					<ButtonStyle
						variant="outlined"
						size="large"
						endIcon={
							<SvgIconStyle
								src="/svg/calendar.svg"
								sx={{
									width: { xs: 18, sm: 22, md: 24, lg: 28 },
									height: { xs: 18, sm: 22, md: 24, lg: 28 },
								}}
							/>
						}
					>
						Расписание
					</ButtonStyle>
				</NextLink>
			</Stack>
		</Container>
	);
};

export default DeviceWidget;
