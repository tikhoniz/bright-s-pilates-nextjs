import { useEffect, useRef, useState } from "react";
// next
import NextLink from "next/link";
import { signOut } from "next-auth/react";
// hooks
import useUser from "../../hooks/useUser";
// material
import { alpha, Skeleton, Tooltip } from "@mui/material";
import { Button, Box, Divider, MenuItem, Typography } from "@mui/material";
// components
import { MIconButton } from "../@material-extend";
import MenuPopover from "../MenuPopover";
import MAvatar from "../@material-extend/MAvatar";
//icons
import { Icon } from "@iconify/react";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import createAvatarsImageUrl from "../../utils/createAvatarsImageUrl";

const MENU_OPTIONS = [
	{ label: "Профиль", icon: personFill, linkTo: "/profile" },
	{ label: "Настройка", icon: settings2Fill, linkTo: "/profile/settings" },
];

export default function AccountPopover() {
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const { user, isLoading, isError } = useUser();

	const url = createAvatarsImageUrl(user?.image?.url);

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	if (isLoading) return <Skeleton variant="circular" width={44} height={44} />;

	if (isError) {
		return (
			<Tooltip
				title={`${isError} Причина: ${isError.info}`}
				arrow
				placement="top"
			>
				<MAvatar alt="Error" src={"sad_emoji.png"} />
			</Tooltip>
		);
	}

	return (
		<>
			{user && (
				<MIconButton
					ref={anchorRef}
					onClick={handleOpen}
					sx={{
						padding: 0,
						width: 46,
						height: 46,
						...(open && {
							"&:before": {
								zIndex: 1,
								content: "''",
								width: "100%",
								height: "100%",

								borderRadius: "50%",
								position: "absolute",
								bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
							},
						}),
					}}
				>
					<MAvatar
						alt={user?.name}
						src={url}
						sx={{ width: "44px", height: "44px" }}
					/>
				</MIconButton>
			)}

			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				sx={{ width: 220 }}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant="subtitle1" noWrap>
						{user?.name}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
						{user?.email}
					</Typography>
				</Box>

				<Divider sx={{ my: 1 }} />

				{MENU_OPTIONS.map((option) => (
					<NextLink key={option.label} href={option.linkTo}>
						<MenuItem
							onClick={handleClose}
							sx={{ typography: "body2", py: 1, px: 2.5 }}
						>
							<Box
								component={Icon}
								icon={option.icon}
								sx={{
									mr: 2,
									width: 24,
									height: 24,
								}}
							/>

							{option.label}
						</MenuItem>
					</NextLink>
				))}

				<Box sx={{ p: 2, pt: 1.5 }}>
					<Button
						fullWidth
						color="inherit"
						variant="outlined"
						onClick={signOut}
					>
						Выйти
					</Button>
				</Box>
			</MenuPopover>
		</>
	);
}
