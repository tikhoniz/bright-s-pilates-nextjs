import React from "react";
import { Button, Stack } from "@mui/material";
import { varFadeIn, varWrapEnter } from "../../animate";
import { styled } from "@mui/material";
import { motion } from "framer-motion";

const RootStyle = styled(motion.div)(({ theme }) => ({
	position: "relative",
	backgroundColor: theme.palette.grey[50],
	maxWidth: "100%",
	height: "100%",
	borderRadius: "8px",
	minHeight: "150px",
}));

const HeroOverlayStyle = styled(motion.img)({
	zIndex: 5,
	width: "100%",
	height: "100%",
	objectFit: "contain",
	borderRadius: "8px",
});

const HelpForUkraineButton = () => {
	return (
		<Stack
			direction="column"
			maxWidth={{ xs: "567px", sm: "300px" }}
			margin="20px"
			alignItems="center"
		>
			<RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
				<HeroOverlayStyle
					alt="overlay"
					src="/help_for_ukraine.jpeg"
					variants={varFadeIn}
				/>
			</RootStyle>
			<Button
				variant="outlined"
				size="large"
				fullWidth
				href="https://bank.gov.ua/ua/news/all/natsionalniy-bank-vidkriv-rahunok-dlya-gumanitarnoyi-dopomogi-ukrayintsyam-postrajdalim-vid-rosiyskoyi-agresiyi"
				color="warning"
				target="_blank"
				sx={{ fontSize: 20, letterSpacing: 5, mt: 2 }}
			>
				ПОМОЩЬ
			</Button>
		</Stack>
	);
};

export default HelpForUkraineButton;
