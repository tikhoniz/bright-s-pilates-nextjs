import React from "react";
import Image from "next/image";

import {
	Box,
	Card,
	Grid,
	Avatar,
	Tooltip,
	Divider,
	Typography,
	IconButton,
} from "@mui/material";

import { styled, alpha } from "@mui/material";

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
		//backdropFilter: "blur(3px)",
		//WebkitBackdropFilter: "blur(3px)", // Fix on Mobile
		borderTopLeftRadius: theme.shape.borderRadiusMd,
		borderTopRightRadius: theme.shape.borderRadiusMd,
		//backgroundColor: alpha(theme.palette.primary.darker, 0.72),
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
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#00000046",
	transition: theme.transitions.create("opacity", {
		easing: theme.transitions.easing.easeIn,
		duration: theme.transitions.duration.standard,
	}),
}));

const CoverHover = ({ className }) => {
	return (
		<CoverHoverStyle className={className}>hgguguyguyguyguyguy</CoverHoverStyle>
	);
};

const VideoItem = () => {
	return (
		<Card>
			<CardMediaStyle>
				<Image
					alt="profile-cover"
					src="/images/coach-cover-image.jpg"
					layout="fill"
					objectFit="cover"
					loading="lazy"
				/>
				<CoverHover className="showActions" />
			</CardMediaStyle>

			<Typography variant="subtitle1" align="center" sx={{ my: 2 }}>
				Название ролика
			</Typography>

			<Divider />

			<Typography
				variant="body2"
				align="center"
				sx={{ color: "text.secondary", py: 1 }}
			>
				Описание ролика
			</Typography>
		</Card>
	);
};

export default VideoItem;
