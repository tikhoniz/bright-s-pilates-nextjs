import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";
import VideoItem from "./VideoItem";
import { MotionInView, varFadeIn, varFadeInDown } from "../animate";

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

const VideoList = () => {
	return (
		<Container maxWidth="xl">
			<Box sx={{ mb: 10, textAlign: "center" }}>
				{/*<MotionInView variants={varFadeInDown}>*/}
				<Typography variant="h2" sx={{ mb: 3 }}>
					Видеоуроки
				</Typography>
				{/*</MotionInView>*/}
			</Box>

			<Grid container spacing={3}>
				{[...Array(8)].map((_, index) => (
					<Grid key={index} item xs={12} sm={6} md={4}>
						<VideoItem />
					</Grid>
				))}

				<SkeletonLoad />
			</Grid>
		</Container>
	);
};

export default VideoList;
