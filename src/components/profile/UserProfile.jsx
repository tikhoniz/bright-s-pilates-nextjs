import { useState } from "react";
// material
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
// components
import ZoomToggle from "./ZoomToggle";
import ProfileAbout from "./ProfileAbout";
import UpcomingClasses from "./UpcomingClasses";
import ModalBasic from "../modal/ModalBasic";
import ProfileFollowInfo from "./ProfileFollowInfo";
import EnrollmentPersonalForm from "../forms/EnrollmentPersonalForm";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

const UserProfile = () => {
	const [isOpen, setOpen] = useState(false);
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Stack spacing={3}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<ProfileFollowInfo />
							</Grid>
							{/* //- ZoomToggle is shown only when the desktop screen */}
							{isDesktop && (
								<Grid item md={12}>
									<ZoomToggle />
								</Grid>
							)}
						</Grid>

						<ProfileAbout />
					</Stack>
				</Grid>
				<Grid item xs={12} md={8}>
					<Stack spacing={3}>
						<UpcomingClasses onEnrollment={() => setOpen(true)} />
					</Stack>
				</Grid>
			</Grid>

			<ModalBasic open={isOpen} onClose={() => setOpen(false)}>
				<EnrollmentPersonalForm
					onClose={() => setOpen(false)}
					coach={"Диана"}
				/>
			</ModalBasic>
		</>
	);
};

export default UserProfile;
