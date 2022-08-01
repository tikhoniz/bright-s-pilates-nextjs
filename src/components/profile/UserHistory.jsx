// material
import { Grid, Stack } from "@mui/material";
// components
import PaidOrderList from "./PaidOderList";
import CompletedClasses from "./CompletedClasses";
// animation
import { MotionInView, varFadeIn } from "../animate";

const UserHistory = () => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Stack spacing={3}>
					<MotionInView variants={varFadeIn}>
						<CompletedClasses />
					</MotionInView>
				</Stack>
			</Grid>

			<Grid item xs={12} md={6}>
				<Stack spacing={3}>
					<MotionInView variants={varFadeIn}>
						<PaidOrderList />
					</MotionInView>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default UserHistory;
