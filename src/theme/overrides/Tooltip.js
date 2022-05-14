// ----------------------------------------------------------------------

export default function Tooltip(theme) {
	const isLight = theme.palette.mode === "light";

	return {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: theme.palette.grey[isLight ? 600 : 800],
					fontSize: 14,
				},
				arrow: {
					color: theme.palette.grey[isLight ? 600 : 700],
				},
			},
		},
	};
}
