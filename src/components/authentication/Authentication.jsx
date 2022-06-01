import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
// material
import {
	Box,
	Skeleton,
	Button,
	Typography,
	Stack,
	Divider,
} from "@mui/material";
import { styled } from "@mui/material";
// components
import Page from "../Page";
import LoginForm from "./LoginForm";
import ToggleMode from "./ToggleMode";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { MotionInView, varFadeIn } from "../animate";
import { signIn } from "next-auth/react";
import GoogleIcon from "../icons/social/icon_google";
import FacebookIcon from "../icons/social/icon_facebook";

//-------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
	margin: theme.spacing(0, 4),
	[theme.breakpoints.up("md")]: {
		margin: 0,
	},
}));

const ContentStyle = styled("div")(({ theme }) => ({
	position: "relative",
	maxWidth: 480,
	margin: "auto",
	display: "flex",
	minHeight: "100%",
	flexDirection: "column",
	justifyContent: "center",
	paddingTop: theme.spacing(18),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(27),
	},
}));

const Authentication = (props) => {
	const [isLogin, setIsLogin] = useState(true);
	const [isReset, setIsReset] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	return (
		<RootStyle title="Вход в аккаунт | Bright's Pilates Studio">
			<ContentStyle>
				{!isReset && (
					<>
						<ToggleMode mode={isLogin} changeModeHandler={setIsLogin} />

						<Typography variant="h4" gutterBottom>
							{isLogin ? "Вход в аккаунт" : "Регистрация нового аккаунта"}
						</Typography>
						<Stack
							direction="row"
							justifyContent="space-between"
							spacing={2}
							sx={{ pt: 2.5 }}
						>
							<Button
								fullWidth
								type="button"
								variant="outlined"
								size="large"
								color="inherit"
								onClick={() => signIn("google")}
								startIcon={<GoogleIcon />}
							>
								Google
							</Button>
							<Button
								fullWidth
								type="button"
								variant="outlined"
								size="large"
								color="inherit"
								onClick={() => signIn("facebook")}
								startIcon={<FacebookIcon />}
							>
								Facebook
							</Button>
						</Stack>

						<Divider
							sx={{
								my: 4,
								width: "100%",
								alignSelf: "center",
							}}
						>
							<Typography
								variant="subtitle2"
								sx={{
									color: "text.secondary",
								}}
							>
								ИЛИ
							</Typography>
						</Divider>
					</>
				)}

				{isLogin && !isReset && (
					<MotionInView variants={varFadeIn}>
						<LoginForm
							isVerified={isVerified}
							setResetHandler={setIsReset}
							{...props}
						/>
					</MotionInView>
				)}

				{isReset && (
					<MotionInView variants={varFadeIn}>
						<ResetPasswordForm setResetHandler={setIsReset} />
					</MotionInView>
				)}

				{!isLogin && (
					<MotionInView variants={varFadeIn}>
						<RegisterForm isVerified={isVerified} {...props} />
					</MotionInView>
				)}

				{!isReset && (
					<MotionInView variants={varFadeIn}>
						<Box
							sx={{
								position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								mt: "1rem",
							}}
						>
							<ReCAPTCHA
								sitekey={process.env.recaptcha_secret}
								onChange={() => setIsVerified(true)}
								onExpired={() => setIsVerified(false)}
							/>

							<Skeleton
								variant="rectangular"
								width="300px"
								animation="wave"
								sx={{
									position: "absolute",
									top: 0,
									zIndex: "-1",
									paddingTop: "70px",
									borderRadius: "4px",
									bgcolor: "grey.250",
								}}
							/>
						</Box>
					</MotionInView>
				)}
			</ContentStyle>
		</RootStyle>
	);
};

export default Authentication;
