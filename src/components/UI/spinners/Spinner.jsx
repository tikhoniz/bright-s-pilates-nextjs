import { Skeleton } from "@mui/material";
import React from "react";

const Spinner = ({ width, animation, height }) => {
	return (
		<Skeleton
			//variant="rectangular"
			variant="text"
			width={width}
			//height='100%'
			animation={animation}
			//sx={{s
			//	paddingTop: "45px",
			//	borderRadius: "4px",
			//	bgcolor: "grey.250",
			//}}
		/>
	);
};

export default Spinner;
