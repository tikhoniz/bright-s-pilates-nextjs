import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
// material
import { Button, Container, Grid, Skeleton, CardHeader } from "@mui/material";
import { styled } from "@mui/material";
// components
import VideoCard from "./VideoCard";
// annimate
import { MotionInView, varFadeIn } from "../animate";
//icons
import { Icon } from "@iconify/react";
import roundOndemandVideo from "@iconify/icons-ic/round-ondemand-video";
import closeCircleOutline from "@iconify/icons-eva/close-circle-outline";

const Wrapper = styled("div")`
	box-shadow: 0 3px 7px rgba(158, 155, 155, 0.3);
	background-clip: padding-box;
	background: linear-gradient(to top, #181818, transparent 50%);
	position: relative;
	padding-top: 56.25%;
`;

const Backdrop = styled("div")`
	z-index: 1300;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #ffffff;

	height: 100vh;
	width: 100vw;

	overflow: hidden;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const StyledReactPlayer = styled(ReactPlayer)`
	position: absolute;
	left: 0;
	top: 0;
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

			{videoId && (
				<Backdrop onClick={() => setVideoId(null)}>
					<Button
						type="button"
						color="primary"
						variant="text"
						size="large"
						startIcon={
							<Icon icon={closeCircleOutline} width={24} height={24} />
						}
						sx={{ mb: 1.5 }}
					>
						Закрыть
					</Button>
					<div style={{ width: "100%", maxWidth: "800px" }}>
						<Wrapper>
							<StyledReactPlayer
								width="100%"
								height="100%"
								ref={reactPlayerRef}
								controls
								playing
								url={`https://www.youtube.com/watch?${videoId}`}
							/>
						</Wrapper>
					</div>
				</Backdrop>
			)}
		</>
	);
};

export default VideoList;
