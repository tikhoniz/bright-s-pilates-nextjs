import PropTypes from "prop-types";
import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
// hooks

import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
	children: PropTypes.node,
};

function ThemeConfig({ children }) {
	const themeOptions = useMemo(
		() => ({
			palette: { ...palette.light, mode: "light" },
			shape,
			typography,
			breakpoints,
			shadows: shadows.light,
			customShadows: customShadows.light,
		}),
		[]
	);

	const theme = createTheme(themeOptions);
	theme.components = componentsOverride(theme);

	return (
		<ThemeProvider theme={theme}>
			{/* normalizes styles CSS */}
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default ThemeConfig;
