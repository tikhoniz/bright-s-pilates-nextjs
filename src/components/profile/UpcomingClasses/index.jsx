import PropTypes from "prop-types";
// next
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
// material
import {
	Box,
	Card,
	Fade,
	Table,
	Button,
	Tooltip,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	CardHeader,
	Typography,
	TableContainer,
	Skeleton,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
// context
import { filterUpcomingClasses } from "../../../utils/filters";
// components
import Scrollbar from "../../Scrollbar";
import UpcomingClassRow from "./UpcomingClassRow";
//icons
import { Icon } from "@iconify/react";
import BaselinePerson from "@iconify/icons-ic/baseline-person";
import editFill from "@iconify/icons-eva/edit-fill";
import useSWR from "swr";
import { MotionInView, varFadeIn } from "../../animate";
import useUserGroupClasses from "../../../hooks/useUserGroupClasses";
import renderMessage from "../../../helpers/renderMessage";

const UpcomingClasses = ({ onEnrollment }) => {
	const theme = useTheme();
	const router = useRouter();
	const { data: session, status } = useSession();

	const { user } = session || {};
	const userEmail = user?.email;
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	// получение списка групповых тренировок пользователя, обновляется при переключении вкладок или через 90 секунд
	const { classes, isLoading, isError } = useUserGroupClasses({
		refreshInterval: 90000,
		revalidateIfStale: true,
	});

	const upcoming = filterUpcomingClasses(classes, 10);

	if (isError)
		return `${isError}: ${renderMessage(isError.info)}. Код ошибки: ${
			isError.status
		}`;

	const SkeletonLoad = () => {
		return (
			<Box
				sx={{
					flexGrow: 1,
					mx: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Skeleton
					width="100%"
					height={56}
					variant="rectangular"
					sx={{ borderRadius: 0.5, backgroundColor: "#eaecee" }}
				/>
				<Skeleton variant="text" height={60} width="95%" />
				<Skeleton variant="text" height={60} width="95%" />
			</Box>
		);
	};

	return (
		<MotionInView variants={varFadeIn}>
			<Card sx={{ minHeight: 200 }}>
				<CardHeader
					title="Мои тренировки"
					sx={{ mb: 3 }}
					action={
						<Tooltip
							title="Записаться на персональную тренировку"
							arrow
							placement="top"
							TransitionComponent={Fade}
							TransitionProps={{ timeout: 300 }}
						>
							<Button
								onClick={onEnrollment}
								size={isMobile ? "small" : "medium"}
								color="inherit"
								variant="contained"
								startIcon={<Icon icon={editFill} />}
								endIcon={isMobile ? <Icon icon={BaselinePerson} /> : null}
							>
								{isMobile ? null : "Персональная тренировка"}
							</Button>
						</Tooltip>
					}
				/>

				{isLoading && <SkeletonLoad />}

				{!isLoading && upcoming.length > 0 && (
					<Scrollbar>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										{!isMobile && <TableCell></TableCell>}
										<TableCell>Начало</TableCell>
										<TableCell>Тип</TableCell>
										{!isMobile && <TableCell>Название</TableCell>}
										{!isMobile && <TableCell>Тренер</TableCell>}
										<TableCell />
									</TableRow>
								</TableHead>

								<TableBody>
									{upcoming.map((item) => {
										return (
											<UpcomingClassRow
												cls={item}
												key={item._id}
												router={router}
												isMobile={isMobile}
												userEmail={userEmail}
											/>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>
				)}
				{!isLoading && upcoming.length <= 0 && (
					<MotionInView variants={varFadeIn}>
						<Box
							sx={{
								my: 5,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h4"
								sx={{
									mb: 2,
									display: "block",
									color: "text.secondary",
								}}
							>
								Нет запланированных тренировок
							</Typography>

							<Button
								onClick={() => router.push("/schedule")}
								size="large"
								variant="outlined"
							>
								Расписание
							</Button>
						</Box>
					</MotionInView>
				)}
			</Card>
		</MotionInView>
	);
};

export default UpcomingClasses;

UpcomingClasses.propTypes = {
	onEnrollment: PropTypes.func,
};
