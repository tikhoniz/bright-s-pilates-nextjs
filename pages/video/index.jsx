// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import VideoList from "../../src/components/video";
import { fetchYoutubeVideos } from "../../src/helpers/api/api-youtubeVideos";

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

const VideosPage = ({ videoList }) => {
	return (
		<RootStyle
			title="Видео | Bright's Pilates"
			description="Смотрите видео тренировки и занимайтесь в любое время"
		>
			<h1 className="visually-hidden">Видео</h1>

			<VideoList videoList={videoList} />
		</RootStyle>
	);
};

export default VideosPage;

export async function getServerSideProps() {
	const response = await fetchYoutubeVideos();

	if (!response.ok) {
		console.log(response.message);
		return {
			props: {
				videoList: [],
			},
		};
	}

	return {
		props: {
			videoList: response.youtubeVideos,
		},
	};
}
