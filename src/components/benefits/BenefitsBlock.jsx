import PropTypes from "prop-types";
// material
import { Box, Grid, Paper, Container, Typography } from "@mui/material";
import { styled, useTheme, useMediaQuery } from "@mui/material";
import {
	varFadeIn,
	MotionInView,
	varFadeInLeft,
	varFadeInRight,
} from "../animate";
//icons
import {
	SideBandIcon,
	SwanDiveIcon,
	LegPullBackIcon,
} from "../icons/pilates-poses";

// ----------------------------------------------------------------------

const BENEFITS_DESCRIPTION = [
	{
		title: "занимаясь с нами вы...",
		description:
			"создадите полезные и функциональные двигательные привычки, которые наполнят качеством и гармонией повседневную жизнь ",
		icon: <SideBandIcon />,
		motion: varFadeInLeft,
	},
	{
		title: "наши занятия...",
		description:
			"это путь к изучению своего тела через движение в удовольствие и получение положительного эмоционального отклика на физическую нагрузку",
		icon: <SwanDiveIcon />,
		motion: varFadeIn,
	},
	{
		title: "с нами вы приобретете...",
		description:
			"настоящее неподдельное чувство гармонии в своем теле. Миллионы людей по всему миру доверили свое тело и сознание методу Пилатес",
		icon: <LegPullBackIcon />,
		motion: varFadeInRight,
	},
];

// ----------------------------------------------------------------------
const IconWrapperStyle = styled("div")(({ theme }) => ({
	margin: "auto",
	display: "flex",
	borderRadius: "50%",
	alignItems: "center",
	width: theme.spacing(25),
	justifyContent: "center",
	height: theme.spacing(25),
	marginBottom: theme.spacing(3),
	color: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

Card.propTypes = {
	category: PropTypes.object,
};

function Card({ category }) {
	const { label, icon } = category;

	return (
		<Paper
			sx={{
				px: 2,
				height: 380,
				display: "flex",
				textAlign: "center",
				alignItems: "center",
				flexDirection: "column",
				justifyContent: "center",
				boxShadow: (theme) => theme.customShadows.z8,
			}}
		>
			<Box sx={{ mb: 2, width: 160, height: 160 }} />
			{icon}
			<Typography variant="subtitle2">{label}</Typography>
		</Paper>
	);
}

export default function BenefitsBlock() {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Container maxWidth="xl">
			<Grid container sx={{ my: 15 }}>
				{BENEFITS_DESCRIPTION.map((item) => (
					<Grid item xs={12} md={4} key={item.title}>
						<MotionInView variants={isDesktop ? item.motion : varFadeIn}>
							<Box
								sx={{
									my: 2,
									mx: "auto",
									maxWidth: { xs: 340, sm: 537, md: 280 },
									textAlign: "center",
								}}
							>
								<IconWrapperStyle>{item.icon}</IconWrapperStyle>
								<Typography paragraph variant="h6" gutterBottom>
									{item.title}
								</Typography>
								<Typography sx={{ color: "text.secondary" }}>
									{item.description}
								</Typography>
							</Box>
						</MotionInView>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
