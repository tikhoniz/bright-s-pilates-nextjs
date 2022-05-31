import {
	Box,
	Card,
	Button,
	Container,
	Grid,
	Skeleton,
	CardHeader,
	Typography,
	Stack,
} from "@mui/material";
import React, { useRef, useState } from "react";
//import VideoCard from "./VideoCard";
import { styled } from "@mui/material";
//import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";
//import roundOndemandVideo from "@iconify/icons-ic/round-ondemand-video";
import roundEditNote from "@iconify/icons-ic/round-edit-note";
import BlogPostCard from "./BlogPostCard";
import useSWR from "swr";
import { MotionInView, varFadeIn } from "../animate";

const SkeletonLoad = () => {
	return (
		<Grid container spacing={3} sx={{ mt: 2 }}>
			{[...Array(4)].map((_, index) => (
				<Grid item xs={12} md={3} key={index}>
					<Skeleton
						variant="rectangular"
						width="100%"
						sx={{ height: 200, borderRadius: 2 }}
					/>
					<Box sx={{ display: "flex", mt: 1.5 }}>
						<Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
						<Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

const BlogPosts = () => {
	const { data, error } = useSWR(`/api/blog/posts`);

	return (
		<Container maxWidth="xl">
			<MotionInView variants={varFadeIn}>
				<CardHeader
					title="Блог"
					sx={{ mb: 3 }}
					avatar={<Icon icon={roundEditNote} width={26} height={26} />}
				/>

				{!data && !error && <SkeletonLoad />}

				{data && (
					<Grid container spacing={3}>
						{data.map((post, index) => (
							<BlogPostCard key={post._id} index={index} post={post} />
						))}
					</Grid>
				)}
			</MotionInView>
		</Container>
	);
};

export default BlogPosts;
