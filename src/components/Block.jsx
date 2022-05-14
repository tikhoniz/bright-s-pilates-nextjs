import PropTypes from "prop-types";
// material
import { Card, CardHeader, Box, Typography } from "@mui/material";

// ----------------------------------------------------------------------

Label.propTypes = {
	title: PropTypes.string,
};

export function Label({ title }) {
	return (
		<Typography
			variant="overline"
			component="p"
			gutterBottom
			sx={{ color: "text.secondary" }}
		>
			{title}
		</Typography>
	);
}

Block.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	sx: PropTypes.object,
};

export function Block({ title, sx, children }) {
	return (
		<Card sx={{ overflow: "unset", position: "unset" }}>
			{title && <CardHeader title={title} />}
			<Box
				sx={{
					p: 3,
					minHeight: 18,
					...sx,
				}}
			>
				{children}
			</Box>
		</Card>
	);
}
