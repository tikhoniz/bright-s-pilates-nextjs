// next
import { useRouter } from "next/router";
// useSWR
import useSWR from "swr";
// hooks
import useUser from "../../hooks/useUser";
// material
import {
	Grid,
	Card,
	Stack,
	Table,
	Skeleton,
	Container,
	TableBody,
	CardHeader,
	TableContainer,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
// components
import TableHead from "./TableHead";
import NoClasses from "./NoClasses";
import Scrollbar from "../Scrollbar";
import ScheduleRow from "./ScheduleRow";
// animate
import { MotionInView, varFadeIn } from "../animate";
//icons
import { Icon } from "@iconify/react";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";
import renderMessage from "../../helpers/renderMessage";

const SkeletonLoad = () => {
	return (
		<Stack spacing={2} sx={{ mb: 10, p: 2 }}>
			<Skeleton
				width="100%"
				height="60px"
				variant="rectangular"
				sx={{
					backgroundColor: "#eaecee",
					borderRadius: "4px",
				}}
			/>
			{[...Array(3)].map((_, index) => (
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					key={index}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Skeleton
						variant="rectangular"
						width="95%"
						animation="wave"
						sx={{
							paddingTop: "45px",
							borderRadius: "4px",
							bgcolor: "grey.250",
						}}
					/>
				</Grid>
			))}
		</Stack>
	);
};

export default function Schedule() {
	const router = useRouter();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	// получает список групповых классов при переключении вкладок или каждые 30 сек
	const { data, error } = useSWR(`/api/classes/groups`, {
		refreshInterval: 30000,
		revalidateIfStale: true,
	});

	const { user, isError } = useUser();

	if (error || isError)
		return `${error || isError}: ${renderMessage(
			error?.info || isError?.info
		)}. Код ошибки: ${error?.status || isError?.status}`;

	return (
		<Container maxWidth="xl">
			<MotionInView variants={varFadeIn}>
				<Card>
					<CardHeader
						title="Расписание тренировок"
						sx={{ mb: 3 }}
						avatar={<Icon icon={BaselineGroups} width={26} height={26} />}
					/>

					<Scrollbar>
						<TableContainer sx={{ minHeight: 355 }}>
							{!data && <SkeletonLoad />}

							{data && (
								<MotionInView variants={varFadeIn}>
									<Table>
										{isDesktop && <TableHead />}
										<TableBody>
											{data.length < 1 ? (
												<NoClasses />
											) : (
												data.map((row) => (
													<ScheduleRow
														key={row?._id}
														cls={row ?? {}}
														user={user ?? {}}
														router={router}
														isDesktop={isDesktop}
													/>
												))
											)}
										</TableBody>
									</Table>
								</MotionInView>
							)}
						</TableContainer>
					</Scrollbar>
				</Card>
			</MotionInView>
		</Container>
	);
}
