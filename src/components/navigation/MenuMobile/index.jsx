import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// next
import { useRouter } from "next/router";
// material
import { List, Drawer, Box } from "@mui/material";
import { MIconButton } from "../../@material-extend";
// components
import Scrollbar from "../../Scrollbar";
import MenuMobileItem from "./MenuMobileItem";
// icons
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
import { useSession } from "next-auth/react";

const MenuMobile = ({ navConfig, isOffset, isHome }) => {
	const { data: session, status } = useSession();

	const { pathname } = useRouter();
	const [mobileOpen, setMobileOpen] = useState(false);

	const { menuList, linkLogin, linkAdmin } = navConfig;

	const isAdmin =
		session?.user?.email === process.env.admin ||
		session?.user?.email === process.env.dev;

	useEffect(() => {
		if (mobileOpen) {
			handleDrawerClose();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const handleDrawerOpen = () => {
		setMobileOpen(true);
	};

	const handleDrawerClose = () => {
		setMobileOpen(false);
	};

	return (
		<>
			<MIconButton
				onClick={handleDrawerOpen}
				aria-label="burger menu"
				sx={{
					ml: 1,
					...(isHome && { color: "common.white" }),
					...(isOffset && { color: "text.primary" }),
				}}
			>
				<Icon icon={menu2Fill} />
			</MIconButton>

			<Drawer
				open={mobileOpen}
				onClose={handleDrawerClose}
				ModalProps={{ keepMounted: true }}
				PaperProps={{ sx: { pb: 5, width: 260 } }}
			>
				<Box
					component="img"
					alt="empty content"
					src="/svg/logo-bp-full.svg"
					sx={{
						width: 44,
						height: 44,
						cursor: "pointer",
						ml: { xs: 2, sm: 3 },
						mb: 2,
						mt: 1,
					}}
				/>
				<Scrollbar>
					<List disablePadding>
						{menuList.map((link) => (
							<MenuMobileItem
								key={link.title}
								item={link}
								pathname={pathname}
							/>
						))}

						{!session && (
							<MenuMobileItem item={linkLogin} pathname={pathname} />
						)}

						{session && isAdmin && (
							<MenuMobileItem item={linkAdmin} pathname={pathname} />
						)}
					</List>
				</Scrollbar>
			</Drawer>
		</>
	);
};

export default MenuMobile;

MenuMobile.propTypes = {
	isOffset: PropTypes.bool,
	isHome: PropTypes.bool,
	isAuth: PropTypes.bool,
	session: PropTypes.object,
};
