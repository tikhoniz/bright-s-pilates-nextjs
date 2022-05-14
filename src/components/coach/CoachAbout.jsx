import { useEffect, useRef } from "react";
import {
	Box,
	Grid,
	Container,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material";
import {
	MotionInView,
	varFadeIn,
	varFadeInLeft,
	varFadeInRight,
	varFadeInUp,
} from "../animate";
import EnrollmentPersonalBox from "../boxes/EnrollmentPersonalBox";
import useIsMountedRef from "../../hooks/useIsMountedRef";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	textAlign: "center",
	paddingTop: theme.spacing(5),
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("md")]: {
		textAlign: "left",
	},
}));

// ----------------------------------------------------------------------

export default function CoachAbout({ story, name, images }) {
	const isMountedRef = useIsMountedRef();

	const theme = useTheme();
	const isLight = theme.palette.mode === "light";
	const shadow = `-40px 40px 80px ${alpha(
		isLight ? theme.palette.grey[500] : theme.palette.common.black,
		0.48
	)}`;

	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<RootStyle>
			<Container maxWidth="lg">
				<Grid container>
					{/* первый текстовый блок */}
					<Grid
						item
						xs={12}
						md={12}
						sx={{ pl: { sm: 30, md: 50 }, mt: { xs: 10, sm: 0 } }}
					>
						{isMountedRef.current && (
							<MotionInView variants={isDesktop ? varFadeInRight : varFadeIn}>
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										textAlign: "justify",
									}}
								>
									{story.part_1}
								</Typography>
							</MotionInView>
						)}
					</Grid>

					<Grid item xs={12} md={12} sx={{ pl: { md: 50 } }}>
						{isMountedRef.current && (
							<MotionInView variants={isDesktop ? varFadeInRight : varFadeIn}>
								{/* второй текстовый блок */}
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										mt: 2,
										textAlign: "justify",
									}}
								>
									{story.part_2}
								</Typography>
							</MotionInView>
						)}
					</Grid>
				</Grid>
				{/* =================================== Start first block ============================================= */}
				<Grid container spacing={3} mt={1} alignItems="center">
					{/* третий текстовый блок */}
					<Grid item xs={12} md={8}>
						{isMountedRef.current && (
							<MotionInView variants={isDesktop ? varFadeInLeft : varFadeIn}>
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										textAlign: "justify",
										//mt: { md: 2 },
									}}
								>
									{story.part_3}
								</Typography>
								{/* четвертый текстовый блок */}
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										mt: 2,
										textAlign: "justify",
									}}
								>
									{story.part_4}
								</Typography>
							</MotionInView>
						)}
					</Grid>

					{/* первый блок фотографий колонка из двух фото */}
					<Grid item xs={12} md={4}>
						<Grid container spacing={3} sx={{ pl: { md: 5 } }}>
							<Grid item sm={6} md={12}>
								{isMountedRef.current && (
									<MotionInView
										variants={isDesktop ? varFadeInRight : varFadeIn}
									>
										<Box
											component="img"
											src={images.image_1.src}
											sx={{
												borderRadius: 2,
												boxShadow: shadow,
											}}
										/>
									</MotionInView>
								)}
							</Grid>
							<Grid item sm={6} md={12}>
								{isMountedRef.current && (
									<MotionInView
										variants={isDesktop ? varFadeInRight : varFadeIn}
									>
										<Box
											component="img"
											src={images.image_2.src}
											sx={{ borderRadius: 2, boxShadow: shadow }}
										/>
									</MotionInView>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* =================================== End first block =============================================== */}

				{/* =================================== Start second block ============================================= */}
				<Grid
					container
					spacing={3}
					mt={5}
					alignItems="center"
					sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
				>
					{/* второй блок фотографий  из двух фото */}
					<Grid item xs={12} md={4}>
						<Grid container spacing={3} sx={{ pr: { md: 5 } }}>
							<Grid item sm={6} md={12}>
								{/*<Stack spacing={3}>*/}
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_3.src}
										sx={{
											borderRadius: 2,
											boxShadow: shadow,
										}}
									/>
								</MotionInView>
							</Grid>
							<Grid item sm={6} md={12}>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_4.src}
										sx={{
											borderRadius: 2,
											boxShadow: shadow,
										}}
									/>
								</MotionInView>
								{/*</Stack>*/}
							</Grid>
						</Grid>
					</Grid>
					{/* пятый текстовый блок */}
					<Grid item xs={12} md={8}>
						{/*<MotionInView >*/}
						{isMountedRef.current && (
							<MotionInView variants={isDesktop ? varFadeInRight : varFadeIn}>
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										textAlign: "justify",
									}}
								>
									{story.part_5}
								</Typography>
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										mt: 2,
										textAlign: "justify",
									}}
								>
									{story.part_6}
								</Typography>
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										mt: 2,
										textAlign: "justify",
									}}
								>
									{story.part_7}
								</Typography>
								<Typography
									sx={{
										color: (theme) =>
											theme.palette.mode === "light"
												? "text.secondary"
												: "common.white",
										mt: 2,
										textAlign: "justify",
									}}
								>
									{story.part_8}
								</Typography>
							</MotionInView>
						)}
					</Grid>
				</Grid>
				{/* =================================== End second block =============================================== */}

				{/* =================================== Start third block ============================================= */}

				{/* девятый текстовый блок */}
				<Grid container mt={5}>
					<Grid item>
						{/*<MotionInView variants={isDesktop ? varFadeInRight : varFadeInUp}>*/}
						<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
							<Typography
								sx={{
									color: (theme) =>
										theme.palette.mode === "light"
											? "text.secondary"
											: "common.white",
									textAlign: "justify",
								}}
							>
								{story.part_9}
							</Typography>
						</MotionInView>
					</Grid>
				</Grid>
				<Grid item>
					<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
						<Typography
							sx={{
								color: (theme) =>
									theme.palette.mode === "light"
										? "text.secondary"
										: "common.white",
								mt: 2,
								textAlign: "justify",
							}}
						>
							{story.part_10}
						</Typography>
					</MotionInView>
				</Grid>

				{/* третий горизонтальный блок фотографий из трех фото горизонтальная*/}
				<Grid container spacing={3} mt={5}>
					<Grid item xs={12} md={12} lg={12}>
						<Grid container spacing={3} alignItems="flex-end">
							<Grid item sm={4}>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_5.src}
										sx={{
											borderRadius: 2,
											boxShadow: shadow,
										}}
									/>
								</MotionInView>
							</Grid>
							<Grid item sm={4}>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_6.src}
										sx={{ borderRadius: 2, boxShadow: shadow }}
									/>
								</MotionInView>
							</Grid>
							<Grid item sm={4}>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_7.src}
										sx={{
											borderRadius: 2,
											boxShadow: shadow,
										}}
									/>
								</MotionInView>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* одиннадцатый текстовый блок */}
				<Grid container mt={5}>
					<Grid item xs={12} md={12} lg={12}>
						<Grid container spacing={3}>
							<Grid item>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Typography
										sx={{
											color: (theme) =>
												theme.palette.mode === "light"
													? "text.secondary"
													: "common.white",
											textAlign: "justify",
										}}
									>
										{story.part_11}
									</Typography>
								</MotionInView>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{/* третий горизонтальный блок фотографий из трех фото горизонтальная*/}
				<Grid container spacing={3} mt={5}>
					<Grid item xs={12} md={12} lg={12}>
						<Grid container spacing={3} alignItems="flex-end">
							<Grid item sm={4}>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_8.src}
										sx={{
											borderRadius: 2,
											boxShadow: shadow,
										}}
									/>
								</MotionInView>
							</Grid>
							<Grid item sm={4}>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_9.src}
										sx={{ borderRadius: 2, boxShadow: shadow }}
									/>
								</MotionInView>
							</Grid>
							<Grid item sm={4}>
								<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
									<Box
										component="img"
										src={images.image_10.src}
										sx={{
											borderRadius: 2,
											boxShadow: shadow,
										}}
									/>
								</MotionInView>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				{/* седьмой текстовый блок */}
				<Grid container mt={5}>
					<Grid item>
						<MotionInView variants={isDesktop ? varFadeInUp : varFadeIn}>
							<Typography
								sx={{
									color: (theme) =>
										theme.palette.mode === "light"
											? "text.secondary"
											: "common.white",
								}}
							>
								{story.part_12}
							</Typography>
						</MotionInView>
					</Grid>
				</Grid>

				<MotionInView variants={varFadeIn}>
					<EnrollmentPersonalBox sx={{ mt: 10 }} coach={name} />
				</MotionInView>
			</Container>
		</RootStyle>
	);
}
