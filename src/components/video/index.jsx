import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
// material
import { ModalUnstyled } from "@mui/base";

import {
	Container,
	Grid,
	Skeleton,
	CardHeader,
	Backdrop,
	Box,
} from "@mui/material";
import { styled } from "@mui/material";
// components
import VideoCard from "./VideoCard";
// annimate
import { MotionInView, varFadeIn } from "../animate";
//icons
import { Icon } from "@iconify/react";
import roundOndemandVideo from "@iconify/icons-ic/round-ondemand-video";
import { MIconButton } from "../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";

const Wrapper = styled("div")`
	box-shadow: 0 0 30px rgb(0 0 0 / 30%), 0 0 8px -5px rgb(0 0 0 / 30%);
	background-clip: padding-box;
	background: linear-gradient(to top, #181818, transparent 50%);
	position: relative;
	padding-top: 56.25%;
`;

const StyledReactPlayer = styled(ReactPlayer)`
	position: absolute;
	left: 0;
	top: 0;
`;

const StyledModal = styled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const SkeletonLoad = () => {
	return [...Array(8)].map((_, index) => (
		<Grid item xs={12} sm={6} md={4} key={index}>
			<Skeleton
				variant="rectangular"
				width="100%"
				sx={{ paddingTop: "100%", borderRadius: 2 }}
			/>
		</Grid>
	));
};

const VideoList = ({ videoList }) => {
	const [videoId, setVideoId] = useState(null);
	const reactPlayerRef = useRef();

	return (
		<>
			<Container maxWidth="xl">
				<MotionInView variants={varFadeIn}>
					<CardHeader
						title="Видео тренировки"
						sx={{ mb: 3 }}
						avatar={<Icon icon={roundOndemandVideo} width={26} height={26} />}
					/>

					<Grid container spacing={3} sx={{ p: 2 }}>
						{videoList.map((video) => (
							<Grid key={video._id} item xs={12} sm={6} md={4}>
								<VideoCard
									isOpen={videoId}
									openVideoHandler={setVideoId}
									video={video}
								/>
							</Grid>
						))}

						{!videoList && <SkeletonLoad />}
					</Grid>
				</MotionInView>
			</Container>

			<StyledModal
				open={!!videoId}
				onClose={() => setVideoId(null)}
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 300,
				}}
				closeAfterTransition={true}
			>
				<Box sx={{ width: { xs: "100%", md: "75%" }, maxWidth: "1600px" }}>
					<MIconButton
						size="large"
						onClick={() => setVideoId(null)}
						sx={{
							mb: 1.5,
							color: "white",
							position: "absolute",
							right: 15,
							top: 15,
						}}
					>
						<Icon icon={closeFill} width="42px" height="42px" />
					</MIconButton>
					<Wrapper>
						<StyledReactPlayer
							width="100%"
							height="100%"
							ref={reactPlayerRef}
							controls
							//playing
							url={`https://www.youtube.com/watch?${videoId}`}
						/>
					</Wrapper>
				</Box>
			</StyledModal>
		</>
	);
};

export default VideoList;
