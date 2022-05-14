import React from "react";
// next
import { useRouter } from "next/router";
// material
import { Container, Button } from "@mui/material";
import { styled } from "@mui/material";
import { useTheme } from "@mui/material";

// animation
import { motion } from "framer-motion";
import { ButtonAnimate } from "../../animate";
// icons
import { Icon } from "@iconify/react";
import arrowheadUpFill from "@iconify/icons-eva/arrow-forward-fill";

const RootStyle = styled(motion.div)(({ theme }) => ({
	top: 0,
	left: 0,
	width: "100%",
	height: "50vh",
	display: "flex",
	position: "absolute",
	zIndex: 19,
}));

const ContentStyle = styled("div")(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100%",
	[theme.breakpoints.up("md")]: {
		//margin: "auto",
		//justifyContent: "center",
		//alignItems: "center",
	},
}));

const AdOffers = () => {
	const theme = useTheme();
	const router = useRouter();

	return (
		<RootStyle
			initial={{ x: -300, opacity: 0 }}
			animate={{
				x: 0,
				opacity: 1,
			}}
			transition={{
				delay: 1,
				duration: 1,
				ease: [0.43, 0.13, 0.23, 0.96],
			}}
		>
			<Container maxWidth="lg">
				<ContentStyle>
					<ButtonAnimate>
						<Button
							sx={{
								boxShadow: "none",
								color: "#847c8e",
								bgcolor: "#ffffffb5",
								paddingY: "13px",
								letterSpacing: 2,
								fontSize: "20px",
								fontWeight: 600,
								"&:hover": {
									bgcolor: "#ffffffb5",
								},
								textTransform: "uppercase",
							}}
							variant="contained"
							endIcon={<Icon icon={arrowheadUpFill} width={24} height={24} />}
							onClick={() => {
								router.push("/schedule");
							}}
						>
							Бесплатные online тренировки
							{/*каждый день*/}
						</Button>
					</ButtonAnimate>
				</ContentStyle>
			</Container>
		</RootStyle>
	);
};

export default AdOffers;
