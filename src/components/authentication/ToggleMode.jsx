import React from "react";
// material
import { styled } from "@mui/material";
import { Link, Typography } from "@mui/material";

//-------------------------------------------------------

const HeaderStyle = styled("header")(({ theme }) => ({
	position: "absolute",
	top: 120,
	right: 0,
	zIndex: 9,
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	[theme.breakpoints.up("md")]: {
		top: 150,
	},
}));

const ToggleMode = ({ mode, changeModeHandler }) => {
	return (
		<HeaderStyle>
			<Typography variant="body2">
				{mode ? "Нет аккаунта?" : "Уже есть аккаунт?"} &nbsp;
			</Typography>
			<Link
				underline="none"
				variant="subtitle2"
				onClick={() => changeModeHandler((prev) => !prev)}
				sx={{ cursor: "pointer" }}
			>
				{mode ? "Регистрация" : "Вход"}
			</Link>
		</HeaderStyle>
	);
};

export default ToggleMode;
