// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import VideoList from "../../src/components/videos/VideoList";

//-------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(10),
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("sm")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
}));
//-------------------------------------------------

const VideosPage = () => {
	return (
		<RootStyle
			title="Видео | Bright's Pilates"
			description="Смотрите видео тренировки и занимайтесь в любое время"
		>
			<VideoList />
		</RootStyle>
	);
};

export default VideosPage;
