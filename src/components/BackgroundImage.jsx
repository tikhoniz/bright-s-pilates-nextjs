import React from "react";
import Image from "next/image";
// material
import { styled } from "@mui/material";
// animation
import { motion } from "framer-motion";
import { varWrapEnter, varFadeIn } from "./animate";

const RootStyle = styled(motion.div)(({ theme }) => ({
	position: "relative",
	backgroundColor: theme.palette.grey[50],
	width: "100%",
	height: "100vh",
}));

const BackgroundImage = ({ image, alt, ...other }) => {
	return (
		<RootStyle
			initial="initial"
			animate="animate"
			variants={varWrapEnter}
			{...other}
		>
			<Image
				src={image}
				layout="fill"
				objectFit="cover"
				placeholder="blur"
				quality={100}
				alt={alt}
			/>
		</RootStyle>
	);
};

export default BackgroundImage;
