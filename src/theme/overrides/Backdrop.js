import { alpha } from "@mui/material";

// ----------------------------------------------------------------------
//! изменяет бакдроп
export default function Backdrop(theme) {
	const varLow = alpha(theme.palette.grey[900], 0.48);
	const varHigh = alpha(theme.palette.grey[900], 1);

	return {
		MuiBackdrop: {
			styleOverrides: {
				root: {
					//background: [
					//	`rgb(22,28,36)`,
					//	`-moz-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
					//	`-webkit-linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
					//	`linear-gradient(75deg, ${varLow} 0%, ${varHigh} 100%)`,
					//],
					background: [`rgba(0,0,0,.9)`],
					"&.MuiBackdrop-invisible": {
						background: "transparent",
					},
				},
			},
		},
	};
}
