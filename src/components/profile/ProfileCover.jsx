import Image from "next/image";

// material
import { Skeleton, Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
// hooks
import useUser from "../../hooks/useUser";
// components
import MyAvatar from "../../components/profile/MyAvatar";

const InfoStyle = styled("div")(({ theme }) => ({
	position: "absolute",
	zIndex: 99,
	right: "auto",
	left: theme.spacing(2),
	bottom: theme.spacing(7),
	display: "flex",
	alignItems: "center",
	[theme.breakpoints.up("md")]: {
		left: theme.spacing(3),
		bottom: theme.spacing(3),
	},
}));

const CoverImgStyle = styled("img")({
	zIndex: 9,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	position: "absolute",
});

// ----------------------------------------------------------------------

const SkeletonLoad = () => {
	return (
		<>
			<Box sx={{ position: "relative" }}>
				<Skeleton width="100%" height="280px" variant="rectangular" />
				<Skeleton
					variant="circular"
					sx={{
						backgroundColor: "#eaecee",
						position: "absolute",
						zIndex: 90,
						top: { xs: 125, sm: 98, md: 128 },
						left: { xs: 17, sm: 15, md: 25 },
						width: { xs: 100, sm: 128 },
						height: { xs: 100, sm: 128 },
					}}
				/>
				<Skeleton
					variant="text"
					height={40}
					sx={{
						backgroundColor: "#d6d8da",
						position: "absolute",
						zIndex: 90,
						top: { xs: 154, sm: 139, md: 172 },
						left: { xs: 123, sm: 150, md: 161 },
						width: { xs: 100, sm: 128 },
					}}
				/>
			</Box>
		</>
	);
};

const ProfileCover = () => {
	const { user, isLoading, isError } = useUser();
	const { name, cover, image } = user;

	return (
		<>
			{isLoading && <SkeletonLoad />}

			{user && image && (
				<>
					<Image
						alt="profile-cover"
						src={cover}
						layout="fill"
						objectFit="cover"
						loading="lazy"
					/>

					<InfoStyle>
						<MyAvatar
							name={name}
							image={image}
							sx={{
								mx: "auto",
								borderWidth: 2,
								borderStyle: "solid",
								borderColor: "common.white",
								width: { xs: 100, sm: 128 },
								height: { xs: 100, sm: 128 },
							}}
						/>

						<Box
							sx={{
								ml: { xs: 2, md: 3 },
								color: "common.white",
								textAlign: { xs: "center", sm: "left" },
							}}
						>
							<Typography variant="h4">{name}</Typography>
						</Box>
					</InfoStyle>
				</>
			)}

			{isError && (
				<Typography variant="h6">
					Не удалось загрузить данные! Попробуйте обновить страницу...
				</Typography>
			)}
		</>
	);
};

export default ProfileCover;
