import { useRef } from "react";
// material
import { Container, styled } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { MotionInView, varFadeIn } from "../animate";

const WrapperStyle = styled("div")(({ theme }) => ({
	position: "relative",

	display: "flex",

	marginTop: 85,

	backgroundImage: "url(/images/mobile_tutorial-frame.png)",

	[theme.breakpoints.up("sm")]: {
		backgroundImage: "url(/images/tablet_tutorial-frame.png)",
		//maxWidth: "640px",
		//marginTop: 45,
	},
	[theme.breakpoints.up("md")]: {
		backgroundImage: "url(/images/desktop_tutorial-frame.png)",
		//maxWidth: "1420px",
		marginTop: 160,
		marginLeft: 100,
		marginRight: 100,
	},
	backgroundSize: "cover",
	backgroundPosition: "center",
}));

const VideoStyle = styled("video")(({ theme }) => ({
	width: "100%",
	height: "auto",
	zIndex: -10,
	//objectFit: "cover",
	transform: "scale(0.77)",

	[theme.breakpoints.up("sm")]: {
		transform: "scale(0.86)",
	},

	[theme.breakpoints.up("md")]: {
		transform: "scale(0.76)",
	},
}));

const TutorialWidget = () => {
	const reactPlayerRef = useRef();

	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center" }}>
			<WrapperStyle>
				<VideoStyle
					ref={reactPlayerRef}
					autoPlay
					muted
					loop
					playsInline
					width={1920}
					height={1080}
					poster={`/images/${
						isDesktop ? "tutorial_desktop-bg" : "tutorial_tablet-bg"
					}.png`}
					autobuffer="true"
					src={`/video/${
						isDesktop ? "tutorial_desktop" : "tutorial_tablet"
					}.mp4`}
				/>
			</WrapperStyle>
		</Container>
	);
};

export default TutorialWidget;
