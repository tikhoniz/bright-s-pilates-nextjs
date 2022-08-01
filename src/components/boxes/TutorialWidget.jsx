import { useRef } from "react";
import ReactPlayer from "react-player";
// material
import { styled } from "@mui/material";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { width } from "@mui/system";

//const StyledReactPlayer = styled(ReactPlayer)`
//	position: absolute;
//	top: 0;
//	left: 0;
//	height: auto;
//	padding-left: 7%;
//	padding-right: 7%;
//	transform: scale(0.98);
//	object-fit: contain;
//`;

const StyledReactPlayer = styled(ReactPlayer)(({ theme }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	height: "auto",

	objectFit: "contain",

	[theme.breakpoints.up("md")]: {
		transform: "scale(0.8)",
	},

	//paddingBottom: "5%",

	//paddingLeft: "7%",
	//paddingRight: "7%",
	//position: "relative",
	//zIndex: -10,
	//paddingTop: "145%",
	//[theme.breakpoints.up("sm")]: {
	//	//paddingRight: theme.spacing(8),
	//	//paddingLeft: theme.spacing(8),
	//	paddingTop: "85%",
	//},
	//[theme.breakpoints.up("md")]: {
	//	paddingTop: "60%",
	//},
}));

const RootStyle = styled(Box)(({ theme }) => ({
	position: "relative",
	maxWidth: 1336,
	height: "100%",
	margin: "0 auto",
	marginTop: theme.spacing(15),
	//backgroundSize: "cover",
	backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	//backgroundImage: "url(/images/mobile.png)",
	[theme.breakpoints.up("sm")]: {
		backgroundImage: "url(/images/tablet_tutorial.png)",
	},
	[theme.breakpoints.up("md")]: {
		backgroundImage: "url(/images/cover-tutorial-main.png)",
	},
}));

const WrapperMain = styled("div")(({ theme }) => ({
	[theme.breakpoints.down("md")]: {
		paddingRight: theme.spacing(8),
		paddingLeft: theme.spacing(8),
	},
	[theme.breakpoints.up("md")]: {
		paddingRight: theme.spacing(8),
		paddingLeft: theme.spacing(8),
	},
}));

const Wrapper = styled("div")(({ theme }) => ({
	position: "relative",
	zIndex: -10,
	paddingTop: "145%",

	//margin: "0 auto",
	//width: "80%",
	[theme.breakpoints.up("sm")]: {
		//paddingRight: theme.spacing(8),
		//paddingLeft: theme.spacing(8),
		paddingTop: "100%",
	},
	[theme.breakpoints.up("md")]: {
		paddingTop: "60%",
	},
}));

const TutorialWidget = () => {
	const reactPlayerRef = useRef();

	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	let url;

	if (isTablet) {
		url = `tutorial tablet-YouTube UHD.mp4`;
	}

	if (isDesktop) {
		url = `tutorial_desktop.mp4`;
	}

	return (
		<WrapperMain>
			<RootStyle>
				<Wrapper>
					<StyledReactPlayer
						width="100%"
						height="100%"
						ref={reactPlayerRef}
						playing
						muted
						loop
						url={`/images/${url}`}
					/>
				</Wrapper>
			</RootStyle>
		</WrapperMain>
	);
};

export default TutorialWidget;
