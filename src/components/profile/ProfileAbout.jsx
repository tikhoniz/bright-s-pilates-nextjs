// hooks
import useUser from "../../hooks/useUser";
// material
import { styled } from "@mui/material";
import {
	Box,
	Card,
	Stack,
	Skeleton,
	Typography,
	CardHeader,
} from "@mui/material";
// icons
import { Icon } from "@iconify/react";
import pinFill from "@iconify/icons-eva/pin-fill";
import emailFill from "@iconify/icons-eva/email-fill";
// animate
import { MotionInView, varFadeIn } from "../animate";

// ----------------------------------------------------------------------
const IconStyle = styled(Icon)(({ theme }) => ({
	width: 20,
	height: 20,
	marginTop: 1,
	flexShrink: 0,
	marginRight: theme.spacing(2),
}));
// ----------------------------------------------------------------------

const SkeletonLoad = () => {
	return (
		<Box sx={{ mx: 1 }}>
			<Skeleton variant="text" height={40} />
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Skeleton variant="circular" width={30} height={30} />
				<Box sx={{ flexGrow: 1, ml: 2 }}>
					<Skeleton variant="text" height={40} />
				</Box>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Skeleton variant="circular" width={30} height={30} />
				<Box sx={{ flexGrow: 1, ml: 2 }}>
					<Skeleton variant="text" height={40} />
				</Box>
			</Box>
		</Box>
	);
};

const ProfileAbout = () => {
	const { user, isLoading, isError } = useUser();
	const { about, country, email, city } = user;

	if (isError) return "ОШИБКА...";

	return (
		<MotionInView variants={varFadeIn}>
			<Card>
				<CardHeader title="О себе" />

				{(isLoading || !user) && <SkeletonLoad />}

				{user && (
					<Stack spacing={2} sx={{ p: 3, pt: 1 }}>
						<Typography variant="body2">{about}</Typography>

						<Stack direction="row">
							<IconStyle icon={pinFill} />
							<Typography variant="body2">
								Живет в &nbsp;
								<Typography component="span" variant="subtitle2">
									{city && `${city},`} &nbsp;
									{country}
								</Typography>
							</Typography>
						</Stack>

						<Stack direction="row">
							<IconStyle icon={emailFill} />
							<Typography variant="body2">{email}</Typography>
						</Stack>
					</Stack>
				)}
			</Card>
		</MotionInView>
	);
};

export default ProfileAbout;
