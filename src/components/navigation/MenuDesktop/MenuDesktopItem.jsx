import PropTypes from "prop-types";
// next
import NextLink from "next/link";
// material
import { Link } from "@mui/material";
import { styled } from "@mui/material";

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
	...theme.typography.subtitle2,
	color: theme.palette.text.primary,
	marginRight: theme.spacing(5),
	transition: theme.transitions.create("opacity", {
		duration: theme.transitions.duration.shortest,
	}),
	"&:hover": {
		opacity: 0.48,
		textDecoration: "none",
	},
}));

// ----------------------------------------------------------------------

const MenuDesktopItem = ({ item, pathname, isHome, isTerms, isOffset }) => {
	const { title, path } = item;
	const isActive = pathname === path;

	return (
		<NextLink key={title} href={path} passHref>
			<LinkStyle
				sx={{
					...(isTerms && { color: "common.white" }),
					...(isHome && { color: "common.white" }),
					...(isOffset && { color: "text.primary" }),
					...(isActive && { color: "primary.main" }),
				}}
			>
				{title}
			</LinkStyle>
		</NextLink>
	);
};

export default MenuDesktopItem;

MenuDesktopItem.propTypes = {
	item: PropTypes.object,
	pathname: PropTypes.string,
	isHome: PropTypes.bool,
	isOffset: PropTypes.bool,
	isTerms: PropTypes.bool,
};
