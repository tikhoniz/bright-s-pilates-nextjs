import NextLink from "next/link";
import { useRouter } from "next/router";
// material
import { Card, Link, styled, Grid, Box } from "@mui/material";

const LinkStyle = styled(Link)(({ theme }) => ({
	opacity: 0.5,
	color: theme.palette.text.primary,
	fontSize: 21,
	whiteSpace: "nowrap",
	"&:hover": {
		opacity: 0.7,
		textDecoration: "none",
	},
}));

const TermsNavigation = () => {
	const { pathname } = useRouter();
	return (
		<Card
			sx={{
				p: 4,
				boxShadow: "0 0.125rem 0.4375rem 0 rgb(0 0 0 / 30%)",
			}}
		>
			<Grid container>
				<Grid item xs={12} md={4}>
					<Box textAlign="center" borderRight={{ md: "1px solid #d8d8d8" }}>
						<NextLink href="/terms-of-service" passHref>
							<LinkStyle
								sx={{
									...(pathname === "terms-of-service" && {
										color: "primary.main",
										fontWeight: 500,
										opacity: 1,
									}),
								}}
							>
								Условия использования
							</LinkStyle>
						</NextLink>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box textAlign="center" borderRight={{ md: "1px solid #d8d8d8" }}>
						<NextLink href="/privacy-policy" passHref>
							<LinkStyle
								sx={{
									...(pathname === "/privacy-policy" && {
										color: "primary.main",
										fontWeight: 500,
										opacity: 1,
									}),
								}}
							>
								Политика конфиденциальности
							</LinkStyle>
						</NextLink>
					</Box>
				</Grid>

				<Grid item xs={12} md={4}>
					<Box textAlign="center">
						<NextLink href="/return-policy" passHref>
							<LinkStyle
								sx={{
									...(pathname === "/return-policy" && {
										color: "primary.main",
										fontWeight: 500,
										opacity: 1,
									}),
								}}
							>
								Политика возврата
							</LinkStyle>
						</NextLink>
					</Box>
				</Grid>
			</Grid>
		</Card>
	);
};
export default TermsNavigation;
