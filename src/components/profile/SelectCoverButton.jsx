import React, { useRef, useState } from "react";
import {
	Box,
	Typography,
	MenuItem,
	Menu,
	Divider,
	Tooltip,
} from "@mui/material";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import { MIconButton } from "../@material-extend";
import { Icon } from "@iconify/react";
//data
import covers from "../../data/covers";
import useUser from "../../hooks/useUser";

function SelectCoverButton({ changeHandler }) {
	const { user, isLoading, isError } = useUser();

	const [open, setOpen] = useState(false);

	const menuRef = useRef(null);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (value) => {
		changeHandler(value);
		handleClose();
	};

	return (
		<Box sx={{ position: "absolute", top: 4, right: 4, zIndex: 2 }}>
			<Tooltip title="Нажмите, чтобы выбрать обои">
				<MIconButton ref={menuRef} size="large" onClick={handleOpen}>
					<Icon icon={moreVerticalFill} width={50} height={50} color="#fff" />
				</MIconButton>
			</Tooltip>

			<Menu
				open={open}
				anchorEl={menuRef.current}
				onClose={handleClose}
				PaperProps={{
					sx: { width: 200, maxWidth: "100%" },
				}}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Typography variant="subtitle2" sx={{ ml: 2 }}>
					Картинки
				</Typography>
				{covers.images.map((option) => (
					<MenuItem
						key={option.value}
						selected={option.value === user.cover}
						onClick={() => handleChange(option.value)}
						sx={{ typography: "body2" }}
					>
						{option.label}
					</MenuItem>
				))}

				<Divider />
				<Typography variant="subtitle2" sx={{ ml: 2 }}>
					Однотонные
				</Typography>
				{covers.simple.map((option) => (
					<MenuItem
						key={option.value}
						selected={option.value === user.cover}
						onClick={() => handleChange(option.value)}
						sx={{ typography: "body2" }}
					>
						{option.label}
					</MenuItem>
				))}

				<Divider />
				<Typography variant="subtitle2" sx={{ ml: 2 }}>
					Текстура
				</Typography>
				{covers.texture.map((option) => (
					<MenuItem
						key={option.value}
						selected={option.value === user.cover}
						onClick={() => handleChange(option.value)}
						sx={{ typography: "body2" }}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
}

export default SelectCoverButton;
