import React from "react";
// next
import Image from "next/image";
// material
import { Card, Divider, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material";
// icons
import { Icon } from "@iconify/react";
import playCircleOutline from "@iconify/icons-eva/play-circle-outline";
import pauseCircleOutline from "@iconify/icons-eva/pause-circle-outline";

//----------------------------------------------------------------------

const CardMediaStyle = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	justifyContent: "center",
	paddingTop: "calc(100% * 9 / 16)",
	"&:before": {
		top: 0,
		zIndex: 9,
		content: "''",
		width: "100%",
		height: "100%",
		position: "absolute",
		borderTopLeftRadius: theme.shape.borderRadiusMd,
		borderTopRightRadius: theme.shape.borderRadiusMd,
	},

	"&:hover": {
		zIndex: 999,
		position: "relative",
		boxShadow: theme.customShadows.z24,
		"& .showActions": { opacity: 1 },
	},
}));

const CoverHoverStyle = styled("div")(({ theme }) => ({
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 99,
	opacity: 0,
	display: "flex",
	position: "absolute",
	alignItems: "center",
	justifyContent: "center",
	//borderRadius: theme.shape.borderRadius,
	backgroundColor: "#00000046",
	transition: theme.transitions.create("opacity", {
		easing: theme.transitions.easing.easeIn,
		duration: theme.transitions.duration.standard,
	}),
}));

const PlayStyle = styled(IconButton)(({ theme }) => ({
	width: 96,
	height: 96,
	color: theme.palette.grey[300],
}));

//----------------------------------------------------------------------

const CoverHover = ({ className, isOpen }) => {
	return (
		<CoverHoverStyle className={className}>
			<PlayStyle>
				<Icon
					icon={isOpen ? pauseCircleOutline : playCircleOutline}
					width={76}
					height={76}
				/>
			</PlayStyle>
		</CoverHoverStyle>
	);
};

const VideoCard = ({ video, isOpen, openVideoHandler }) => {
	const coverUrl =
		process.env.publitio_youtube_video_covers_folder + video?.cover?.url;

	return (
		<Card
			onClick={() => openVideoHandler(video.youtubeId)}
			sx={{ cursor: "pointer" }}
		>
			<CardMediaStyle>
				<Image
					alt="profile-cover"
					src={coverUrl}
					layout="fill"
					objectFit="cover"
					loading="lazy"
				/>
				<CoverHover className="showActions" isOpen={isOpen} />
			</CardMediaStyle>

			<Typography variant="subtitle1" align="center" sx={{ my: 2 }}>
				{video.title}
			</Typography>

			<Divider />

			<Typography
				variant="body2"
				align="center"
				sx={{ color: "text.secondary", py: 1 }}
			>
				{video.description}
			</Typography>
		</Card>
	);
};

export default VideoCard;
