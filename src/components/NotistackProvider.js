import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { SnackbarProvider } from "notistack";
import infoFill from "@iconify/icons-eva/info-fill";
import alertCircleFill from "@iconify/icons-eva/alert-circle-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";
import checkmarkCircle2Fill from "@iconify/icons-eva/checkmark-circle-2-fill";

// material
import { Box, alpha } from "@mui/material";

// ----------------------------------------------------------------------

SnackbarIcon.propTypes = {
	icon: PropTypes.object,
	color: PropTypes.string,
};

function SnackbarIcon({ icon, color }) {
	return (
		<Box
			component="span"
			sx={{
				mr: 1.5,
				width: 40,
				height: 40,
				display: "flex",
				borderRadius: 1.5,
				//alignItems: "center",
				//justifyContent: "center",
				//color: `${color}.main`,
				//bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
			}}
		>
			<Icon icon={icon} width={34} height={34} />
		</Box>
	);
}

NotistackProvider.propTypes = {
	children: PropTypes.node,
};

export default function NotistackProvider({ children }) {
	return (
		<SnackbarProvider
			//dense
			//onClose={() => alert("SnackbarProvider")}
			maxSnack={2}
			preventDuplicate
			autoHideDuration={3000}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			iconVariant={{
				success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
				error: <SnackbarIcon icon={infoFill} color="error" />,
				warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
				info: <SnackbarIcon icon={alertCircleFill} color="info" />,
			}}
		>
			{children}
		</SnackbarProvider>
	);
}
