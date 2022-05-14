// material
import { Grid } from "@mui/material";
// utils
import { filterUpcomingClasses } from "../../../../utils/filters";
// components
import ClassCard from "./ClassCard";

const ClassList = () => {
	const groupClasses = [];

	const filtered = filterUpcomingClasses(groupClasses, 0).slice(0, 3);

	return (
		<Grid container spacing={3}>
			{filtered.map((cls) => (
				<Grid key={cls._id} item xs={12} sm={6} md={4}>
					<ClassCard cls={cls} />
				</Grid>
			))}
		</Grid>
	);
};

export default ClassList;
