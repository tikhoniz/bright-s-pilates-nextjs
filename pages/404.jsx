// next
import NextLink from "next/link";
// material
import { Button, Container, Typography, Box, styled } from "@mui/material";
// components
import Page from "../src/components/Page";
import { MotionContainer, varBounceIn } from "../src/components/animate";
// animation
import { motion } from "framer-motion";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	display: "flex",
	minHeight: "100%",
	alignItems: "center",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function PageNotFound() {
	return (
		<RootStyle title="404 Страница не найдена | Bright's Pilates">
			<Container>
				<MotionContainer initial="initial" open>
					<Box sx={{ maxWidth: 680, margin: "auto", textAlign: "center" }}>
						<motion.div variants={varBounceIn}>
							<Typography variant="h3" paragraph sx={{ position: "relative" }}>
								Упс! Такой страницы не существует
							</Typography>
						</motion.div>
						<Typography sx={{ color: "text.secondary" }}>
							К сожалению, мы не смогли найти нужную страницу. Возможно, вы
							ошиблись при вводе адреса? Пожалуйста, проверьте введенные данные.
						</Typography>
						<NextLink href="/" passHref>
							<Button size="large" variant="contained" sx={{ mt: 10 }}>
								На главную
							</Button>
						</NextLink>
					</Box>
				</MotionContainer>
			</Container>
		</RootStyle>
	);
}
