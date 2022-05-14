import { forwardRef } from "react";
// material
import { Avatar, useTheme } from "@mui/material";

const MAvatar = forwardRef(
	({ color = "default", sx, children, ...other }, ref) => {
		const theme = useTheme();

		if (color === "default") {
			return (
				<Avatar ref={ref} sx={{ backgroundColor: "#C4CDD5", ...sx }} {...other}>
					{children}
				</Avatar>
			);
		}

		return (
			<Avatar
				ref={ref}
				sx={{
					fontWeight: theme.typography.fontWeightMedium,
					color: theme.palette[color].contrastText,
					backgroundColor: theme.palette[color].main,
					...sx,
				}}
				{...other}
			>
				{children}
			</Avatar>
		);
	}
);

export default MAvatar;
