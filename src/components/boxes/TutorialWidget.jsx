import { useRef } from "react";
// material
import { Container, styled } from "@mui/material";
import MHidden from "../@material-extend/MHidden";

const WrapperStyle = styled("div")(({ theme }) => ({
	position: "relative",

	display: "flex",

	marginTop: 85,

	backgroundImage: "url(/images/mobile_tutorial-frame.png)",

	[theme.breakpoints.up("sm")]: {
		backgroundImage: "url(/images/tablet_tutorial-frame.png)",
	},
	[theme.breakpoints.up("md")]: {
		backgroundImage: "url(/images/desktop_tutorial-frame.png)",
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

	return (
		<Container maxWidth="xl" sx={{ display: "flex", justifyContent: "center" }}>
			<WrapperStyle>
				<MHidden width="smUp">
					<VideoStyle
						ref={reactPlayerRef}
						autoPlay
						muted
						loop
						playsInline
						width={500}
						height={700}
						poster={`/images/tutorial_tablet-bg.png`}
						preload="auto"
						src={`/video/tutorial_tablet.mp4`}
					/>
				</MHidden>

				<MHidden width={"mdUp"}>
					<MHidden width={"smDown"}>
						<VideoStyle
							ref={reactPlayerRef}
							autoPlay
							muted
							loop
							playsInline
							width={720}
							height={1100}
							poster={`/images/tutorial_tablet-bg.png`}
							preload="auto"
							src={`/video/tutorial_tablet.mp4`}
						/>
					</MHidden>
				</MHidden>

				<MHidden width="mdDown">
					<VideoStyle
						ref={reactPlayerRef}
						autoPlay
						muted
						loop
						playsInline
						width={1920}
						height={1080}
						poster={`/images/tutorial_desktop-bg.png`}
						preload="auto"
						src={`/video/tutorial_desktop.mp4`}
					/>
				</MHidden>
			</WrapperStyle>
		</Container>
	);
};

export default TutorialWidget;
