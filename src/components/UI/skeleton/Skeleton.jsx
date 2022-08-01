import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const SkeletonLoad = ({ num, variant, height, width, animation, sx }) => {
	const skeletons = [...Array(num)].map((_, index) => (
		<Skeleton
			key={index}
			variant={variant || "text"}
			height={height}
			width={width}
			animation={animation || "wave"}
			sx={{
				borderRadius: "4px",
				bgcolor: "grey.250",
				margin: "20px",
				...sx,
			}}
		/>
	));

	return <Box sx={{ mx: 1 }}>{skeletons}</Box>;
};

export default SkeletonLoad;
