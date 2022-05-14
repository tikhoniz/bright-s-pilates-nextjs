import PropTypes from "prop-types";
// next
import NextLink from "next/link";
// material
import { alpha, styled } from "@mui/material";
import { ListItemText, ListItemIcon, ListItemButton } from "@mui/material";

// ----------------------------------------------------------------------

const ITEM_SIZE = 48;
const PADDING = 2.5;

const LinkStyle = styled(ListItemButton)(({ theme }) => ({
	...theme.typography.body2,
	height: ITEM_SIZE,
	textTransform: "capitalize",
	paddingLeft: theme.spacing(PADDING),
	paddingRight: theme.spacing(2.5),
	color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

const MenuMobileItem = ({ item, pathname }) => {
	const { title, path, icon } = item;
	const isActive = pathname === path;

	return (
		<NextLink key={title} href={path} passHref>
			<LinkStyle
				sx={{
					...(isActive && {
						color: "primary.main",
						fontWeight: "fontWeightMedium",
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.selectedOpacity
							),
					}),
				}}
			>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText disableTypography primary={title} />
			</LinkStyle>
		</NextLink>
	);
};

export default MenuMobileItem;

MenuMobileItem.propTypes = {
	item: PropTypes.object,
	isOpen: PropTypes.bool,
	isActive: PropTypes.bool,
};
