// next
import NextLink from "next/link";
// components
import Page from "../src/components/Page";
import { MotionContainer, varBounceIn } from "../src/components/animate";
// material
import { Button, Container, Typography, Box, styled } from "@mui/material";
// animation
import { motion } from "framer-motion";
// icons
import IllustrationUnderConstruction from "../src/components/icons/illustration_under_construction";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	display: "flex",
	minHeight: "100%",
	alignItems: "center",
	paddingTop: theme.spacing(20),
	paddingBottom: theme.spacing(25),
}));

// ----------------------------------------------------------------------

export default function UnderConstruction() {
	return (
		<RootStyle
			title="Страница в разработке | Bright's Pilates"
			description="Страница находится в разработке опытными девелоперами и скоро появится на этом месте. "
		>
			<h1 className="visually-hidden">
				"Страница в разработке Bright's Pilates"
			</h1>
			<Container>
				<MotionContainer initial="initial" open>
					<Box sx={{ maxWidth: 680, margin: "auto", textAlign: "center" }}>
						<motion.div variants={varBounceIn}>
							<Typography variant="h3" paragraph sx={{ position: "relative" }}>
								Страница находится в разработке
							</Typography>
						</motion.div>
						<Typography sx={{ color: "text.secondary" }}>
							Мы делаем всё возмножное и невозможное, чтобы как можно скорее
							закончить работу!
						</Typography>

						<motion.div variants={varBounceIn}>
							<IllustrationUnderConstruction
								sx={{ height: 410, my: { xs: 5, sm: 5 } }}
							/>
						</motion.div>

						<NextLink href="/" passHref>
							<Button size="large" variant="contained">
								На главную
							</Button>
						</NextLink>
					</Box>
				</MotionContainer>
			</Container>
		</RootStyle>
	);
}
