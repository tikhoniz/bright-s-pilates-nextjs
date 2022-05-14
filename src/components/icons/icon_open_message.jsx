// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export default function OpenMessageIcon({ ...other }) {
	const PRIMARY_MAIN = "#229A16";

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
					fill={PRIMARY_MAIN}
					d="M400 163.2V68a20.023 20.023 0 0 0-20-20H132a20.023 20.023 0 0 0-20 20v95.2l-96 68.566V496h480V231.766zm53.679 77.667L400 275.96v-73.44zM144 80h224v216.883l-57.166 37.378l-46.578-24.152l-50.764 24.507L144 292.425zm119.744 265.89L464 449.727V464H48v-13.957zM48 271.575L179.144 351.2L48 414.509zm295.446 79.6L464 272.347v141.334zM112 202.52V273l-53.334-32.385z"
				/>
			</svg>
		</Box>
	);
}
