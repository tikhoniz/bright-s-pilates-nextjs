import { Box, Container, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Page from "../../src/components/Page";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	display: "flex",
	minHeight: "100vh",
	alignItems: "center",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------
const ErrorAuthPage = () => {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push("/auth");
		}, 2000);
	}, []);

	return (
		<RootStyle title="Аккаунт не создан | Bright's Pilates">
			<Container>
				<Box sx={{ maxWidth: 680, margin: "auto", textAlign: "center" }}>
					<Typography variant="h3" paragraph sx={{ position: "relative" }}>
						Упс! Не получилось создать аккаунт
					</Typography>
					<Typography sx={{ color: "text.secondary" }}>
						Попробуйте еще раз
					</Typography>
				</Box>
			</Container>
		</RootStyle>
	);
};

export default ErrorAuthPage;
