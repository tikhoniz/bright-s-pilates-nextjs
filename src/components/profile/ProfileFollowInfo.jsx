import PropTypes from "prop-types";
// material
import { Card, Divider, Skeleton, Stack, Typography } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumber";
import useUser from "../../hooks/useUser";
import { MotionInView, varFadeIn } from "../animate";
import { styled } from "@mui/material";

// ----------------------------------------------------------------------

const TypographyStyle = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.fontFamilySecondary,
}));

// ----------------------------------------------------------------------

const SkeletonLoad = () => {
	return <Skeleton width="3rem" variant="text" />;
};

const ProfileFollowInfo = () => {
	const { user, isLoading, isError } = useUser();

	return (
		<MotionInView variants={varFadeIn}>
			<Card sx={{ display: "flex" }}>
				<Stack
					direction="row"
					width="100%"
					padding="24px 0"
					divider={<Divider orientation="vertical" flexItem />}
				>
					<Stack
						width={1}
						textAlign="center"
						alignItems="center"
						justifyContent="space-between"
					>
						<TypographyStyle variant="h2">
							{isLoading && <SkeletonLoad />}

							{!isLoading && !isError && (
								<MotionInView variants={varFadeIn}>
									{fNumber(user?.groups)}
								</MotionInView>
							)}

							{isError && 0}
						</TypographyStyle>

						<Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
							Групповые
						</Typography>
					</Stack>

					<Stack
						width={1}
						textAlign="center"
						alignItems="center"
						justifyContent="space-between"
					>
						<TypographyStyle variant="h2">
							{isLoading && <SkeletonLoad />}

							{!isLoading && !isError && (
								<MotionInView variants={varFadeIn}>
									{fNumber(user?.personals)}
								</MotionInView>
							)}

							{isError && 0}
						</TypographyStyle>

						<Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
							Персональные
						</Typography>
					</Stack>
				</Stack>
			</Card>
		</MotionInView>
	);
};

ProfileFollowInfo.propTypes = {
	user: PropTypes.object,
};

export default ProfileFollowInfo;
