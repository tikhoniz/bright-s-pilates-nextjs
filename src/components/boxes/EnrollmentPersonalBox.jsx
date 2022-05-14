import { useRouter } from "next/router";
// material
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

import { Box, CardActionArea, Stack } from "@mui/material";
//icons
import {
	MotionInView,
	TextAnimate,
	varFadeInRight,
	varWrapEnter,
	varFadeIn,
} from "../animate";
import { useState } from "react";
import ModalBasic from "../modal/ModalBasic";
import EnrollmentPersonalForm from "../forms/EnrollmentPersonalForm";
// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
	//boxShadow: "none",
	position: "relative",
	//textAlign: "center",
	//backgroundColor: theme.palette.primary.main,
	//backgroundSize: "contain",
	//backgroundPosition: "center",
	//backgroundRepeat: "no-repeat",
	//backgroundImage: 'url("/enrollment_personal.png")',
	//backgroundColor: "red",
	[theme.breakpoints.up("md")]: {
		//height: 160,
		//height: "100%",
		//display: "flex",
		//textAlign: "left",
		//alignItems: "center",
		//justifyContent: "space-between",
	},
}));

// ----------------------------------------------------------------------

const EnrollmentPersonalBox = ({ sx, coach }) => {
	const [isOpen, setOpen] = useState(false);

	const resetContactForm = () => {
		setOpen(false);
	};
	return (
		<>
			<RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
				<CardActionArea
					onClick={() => setOpen(true)}
					sx={{
						py: 2,
						px: 4,
						borderRadius: 2,
						color: "primary.main",
						bgcolor: "background.neutral",

						height: { xs: "267px", sm: "192px" },
						position: "relative",

						display: "flex",
						justifyContent: "space-between",

						...sx,
					}}
				>
					<Stack>
						<Stack
							sx={{
								display: "inline-flex",
								flexDirection: { sm: "row" },
								color: "#46514D",
							}}
						>
							<TextAnimate
								text="Вам &nbsp; нужен"
								sx={{ mr: 2, typography: "h4" }}
							/>
							<TextAnimate
								text="индивидуальный"
								sx={{ color: "primary.main", typography: "h4", mr: 2 }}
							/>
							<TextAnimate text="подход?" sx={{ typography: "h4" }} />
						</Stack>

						<Stack
							sx={{
								display: "inline-flex",
								color: "#46514D",
								flexDirection: { md: "row" },
							}}
						>
							<TextAnimate
								text="Записывайтесь &nbsp; на"
								sx={{ mr: 2, typography: "h3" }}
								variants={varFadeInRight}
							/>
							<TextAnimate
								text="персональную"
								sx={{ color: "primary.main", typography: "h3", mr: 2 }}
								variants={varFadeInRight}
							/>
							<TextAnimate
								text="тренировку &nbsp; &rarr;"
								sx={{ typography: "h3", mr: 2 }}
								variants={varFadeInRight}
							/>
						</Stack>
					</Stack>

					<Box
						sx={{
							maxWidth: { xs: "211px", sm: "302px", md: "315px" },
							position: "absolute",
							top: { xs: 152, sm: 28, md: 20 },
							right: 0,
						}}
					>
						<MotionInView variants={varFadeIn}>
							<Box
								component={motion.img}
								src="/images/enrollment_personal.png"
								alt="Молодая женщина сидит на коврике и общается через ноутбук"
								whileTap="tap"
								whileHover="hover"
								variants={{
									hover: { scale: 1.02 },
									tap: { scale: 0.98 },
								}}
							/>
						</MotionInView>
					</Box>
				</CardActionArea>
			</RootStyle>

			<ModalBasic open={isOpen} onClose={resetContactForm}>
				<EnrollmentPersonalForm
					onCloseModalHandler={resetContactForm}
					coach={coach}
				/>
			</ModalBasic>
		</>
	);
};

export default EnrollmentPersonalBox;
