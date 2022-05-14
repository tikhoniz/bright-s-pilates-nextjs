// material
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function RegistrDone({ ...other }) {
	const theme = useTheme();
	const PRIMARY_MAIN = theme.palette.primary.main;
	const PRIMARY_DARK = theme.palette.primary.dark;

	return (
		<Box {...other}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				role="img"
				width="100%"
				height="100%"
				preserveAspectRatio="xMidYMid meet"
				viewBox="0 0 16 16"
			>
				<g fill={PRIMARY_MAIN}>
					<path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
					<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
				</g>
			</svg>
		</Box>
	);
}
