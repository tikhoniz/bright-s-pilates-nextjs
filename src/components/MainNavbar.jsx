// next
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
// material
import { styled } from "@mui/material";
import { Box, AppBar, Toolbar, Container } from "@mui/material";
// hooks
import useOffSetTop from "../hooks/useOffSetTop";
// components
import MenuDesktop from "./navigation/MenuDesktop";
import MenuMobile from "./navigation/MenuMobile";
import AccountPopover from "./account/AccountPopover";
// data
import menuConfig from "../data/menuConfig";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
	height: APP_BAR_MOBILE,
	transition: theme.transitions.create(["height", "background-color"], {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.shorter,
	}),
	[theme.breakpoints.up("md")]: {
		height: APP_BAR_DESKTOP,
	},
}));

const ToolbarShadowStyle = styled("div")(({ theme }) => ({
	left: 0,
	right: 0,
	bottom: 0,
	height: 24,
	zIndex: -1,
	margin: "auto",
	borderRadius: "50%",
	position: "absolute",
	width: `calc(100% - 48px)`,
	boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
	const isOffset = useOffSetTop(20);
	const { pathname } = useRouter();
	const { status } = useSession();

	const isHome = pathname === "/";
	const isAuth = pathname === "/auth";
	const isTerms =
		pathname === "/terms-of-service" ||
		pathname === "/privacy-policy" ||
		pathname === "/return-policy";

	return (
		<AppBar
			id="header"
			sx={{ boxShadow: 0, bgcolor: "transparent", gridArea: "header" }}
		>
			<ToolbarStyle
				disableGutters
				sx={{
					...(isOffset && {
						bgcolor: "background.default",
						height: { md: APP_BAR_DESKTOP - 16 },
					}),
				}}
			>
				<Container
					maxWidth="xl"
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					{/* здесь должно быть лого */}
					<NextLink href="/">
						<Box
							component="img"
							alt="empty content"
							src={
								isOffset ? "/svg/logo-bp-full.svg" : "/svg/logo-bp-reverse.svg"
							}
							sx={{ width: 44, height: 44, cursor: "pointer" }}
						/>
					</NextLink>
					{/* рассталкивает меню и логотип */}
					<Box sx={{ flexGrow: { md: 1 } }} />
					<Box sx={{ display: { xs: "none", md: "block" } }}>
						{!isAuth && (
							<MenuDesktop
								isOffset={isOffset}
								isHome={isHome}
								isTerms={isTerms}
								navConfig={menuConfig}
							/>
						)}
					</Box>

					<Box sx={{ display: { xs: "block", md: "none" } }}>
						<MenuMobile
							isOffset={isOffset}
							isTerms={isTerms}
							isHome={isHome}
							isAuth={isAuth}
							navConfig={menuConfig}
						/>
					</Box>

					{/* рассталкивает меню и логотип */}
					<Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

					<Box sx={{ position: "relative" }}>
						{status === "authenticated" && <AccountPopover />}
					</Box>
				</Container>
			</ToolbarStyle>
			{/* дает тень под меню */}
			{isOffset && <ToolbarShadowStyle />}
		</AppBar>
	);
}
