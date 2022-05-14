import PropTypes from "prop-types";
// next
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// material
import { Stack } from "@mui/material";
// components
import MenuDesktopItem from "./MenuDesktopItem";
import AccountPopover from "../../account/AccountPopover";

// ----------------------------------------------------------------------

const MenuDesktop = ({ isOffset, isHome, isTerms, navConfig }) => {
	const { data: session, status } = useSession();

	const { pathname } = useRouter();
	const { menuList, linkLogin, linkAdmin } = navConfig;

	const isAdmin =
		(session?.user?.email !== undefined &&
			session?.user?.email === process.env.admin) ||
		(session?.user?.email !== undefined &&
			session?.user?.email === process.env.dev);

	return (
		<Stack direction="row">
			{menuList.map((link) => (
				<MenuDesktopItem
					key={link.title}
					item={link}
					pathname={pathname}
					isOffset={isOffset}
					isHome={isHome}
					isTerms={isTerms}
				/>
			))}

			{status === "authenticated" && isAdmin && (
				<MenuDesktopItem
					item={linkAdmin}
					pathname={pathname}
					isOffset={isOffset}
					isHome={isHome}
					isTerms={isTerms}
				/>
			)}

			{status === "unauthenticated" && (
				<MenuDesktopItem
					item={linkLogin}
					pathname={pathname}
					isOffset={isOffset}
					isHome={isHome}
					isTerms={isTerms}
				/>
			)}

			{/*аватар с выпадающим меню*/}
			{/*{status === "authenticated" && <AccountPopover />}*/}
		</Stack>
	);
};

export default MenuDesktop;

MenuDesktop.propTypes = {
	isOffset: PropTypes.bool,
	isHome: PropTypes.bool,
	isTerms: PropTypes.bool,
	navConfig: PropTypes.object,
	session: PropTypes.object,
};
