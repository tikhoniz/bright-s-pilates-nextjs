import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonLoad = ({ num, variant, height }) => {
	const skeletons = [...Array(num)].map((_, index) => (
		<Skeleton key={index} variant={variant} height={height} />
	));

	return <Box sx={{ mx: 1 }}>{skeletons}</Box>;
};

export default SkeletonLoad;
