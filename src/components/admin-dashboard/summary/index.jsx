import React from "react";
// material
import { Grid, Container } from "@mui/material";
// components
import TotalUsers from "./TotalUsers";

const Summary = () => {
	return (
		<Container maxWidth="lg" sx={{ p: 4 }}>
			{/*<ClassList />*/}
			<Grid container spacing={3} sx={{ my: 4 }}>
				<Grid item xs={12} sm={6} md={4}>
					<TotalUsers />
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					{/*<TotalUsers users={users} />*/}
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					{/*<TotalUsers users={users} />*/}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Summary;
