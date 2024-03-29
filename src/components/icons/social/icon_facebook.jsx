// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function FacebookIcon({ ...other }) {
	return (
		<Box {...other}>
			<svg viewBox="0 0 36 36" height="24" width="24">
				<path
					d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
					fill="#1b74e4"
				></path>
			</svg>
		</Box>
	);
}
