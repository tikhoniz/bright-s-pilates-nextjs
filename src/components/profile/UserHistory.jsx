import PropTypes from "prop-types";
// material
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
// components
import ClassesCompleted from "./ClassesCompleted";
import PaidOrderList from "./PaidOderList";
// animation
import { MotionInView, varFadeIn } from "../animate";

// ----------------------------------------------------------------------

UserHistory.propTypes = {
	//myProfile: PropTypes.object,
	//posts: PropTypes.array,
};

export default function UserHistory() {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Stack spacing={3}>
					<MotionInView variants={varFadeIn}>
						<ClassesCompleted />
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
}
