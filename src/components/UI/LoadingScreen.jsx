import { useState, useEffect } from "react";
// next
import { useRouter } from "next/router";

import { motion } from "framer-motion";
// material
import { alpha, styled, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	width: "100%",
	height: "100%",
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 999,
	backgroundColor: alpha(theme.palette.background.default, 0.56),
}));

// ----------------------------------------------------------------------

export default function LoadingScreen({ ...other }) {
	const router = useRouter();
	const theme = useTheme();
	const [loading, setLoading] = useState(false);
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	useEffect(() => {
		const handleStart = () => {
			setLoading(true);
		};
		const handleStop = () => {
			setLoading(false);
		};

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleStop);
		router.events.on("routeChangeError", handleStop);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleStop);
			router.events.off("routeChangeError", handleStop);
		};
	}, [router]);

	if (loading && isDesktop) {
		return (
			<RootStyle {...other}>
				{/*<motion.div
					initial={{ rotateY: 0 }}
					animate={{ rotateY: 360 }}
					transition={{
						duration: 2,
						ease: "easeInOut",
						repeatDelay: 1,
						repeat: Infinity,
					}}
				>
					<img
						src="/svg/logo-bp-reverse.svg"
						alt=""
						style={{ width: 48, height: 48 }}
					/>
				</motion.div>*/}

				<Box
					component={motion.div}
					animate={{
						scale: [1.2, 1, 1, 1.2, 1.2],
						rotate: [270, 0, 0, 270, 270],
						opacity: [0.25, 1, 1, 1, 0.25],
						borderRadius: ["25%", "25%", "50%", "50%", "25%"],
					}}
					transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
					sx={{
						width: 100,
						height: 100,
						borderRadius: "25%",
						position: "absolute",
						border: (theme) =>
							`solid 3px ${alpha(theme.palette.common.black, 0.54)}`,
					}}
				/>

				<Box
					component={motion.div}
					animate={{
						scale: [1, 1.2, 1.2, 1, 1],
						rotate: [0, 270, 270, 0, 0],
						opacity: [1, 0.25, 0.25, 0.25, 1],
						borderRadius: ["25%", "25%", "50%", "50%", "25%"],
					}}
					transition={{
						ease: "linear",
						duration: 3.2,
						repeat: Infinity,
					}}
					sx={{
						width: 120,
						height: 120,
						borderRadius: "25%",
						position: "absolute",
						border: (theme) =>
							`solid 8px ${alpha(theme.palette.common.base, 1)}`,
					}}
				/>
			</RootStyle>
		);
	}
	return null;
}
