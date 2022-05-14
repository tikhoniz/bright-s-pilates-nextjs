// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function NewMessageIcon({ ...other }) {
	return (
		<Box {...other}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width="100%"
				height="100%"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 512 512"
			>
				<path
					fill="currentColor"
					d="M16 112v384h480V112zm220.8 229.6a32.167 32.167 0 0 0 38.4 0l23.467-17.6L464 448v16H48v-16l165.333-124zM256 316L48 160v-16h416v16zM48 200l138.667 104L48 408zm416 208L325.333 304L464 200z"
				/>
			</svg>
		</Box>
	);
}
