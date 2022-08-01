// next
import { useRouter } from "next/router";
// useSWR
import useSWR from "swr";
// hooks
import useUser from "../../hooks/useUser";
// material
import {
	Grid,
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
import baselineCalendarToday from "@iconify/icons-ic/baseline-calendar-today";
import renderMessage from "../../helpers/renderMessage";
import SkeletonLoad from "../UI/skeleton/Skeleton";

export default function Schedule() {
	const router = useRouter();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
	// получает список групповых классов при переключении вкладок или каждые 30 сек
	const { data, error } = useSWR(`/api/classes/groups`, {
		refreshInterval: 30000,
		revalidateIfStale: true,
	});

	const { user } = useUser();

	if (error)
		return `${error}: ${renderMessage(error?.info)}. Код ошибки: ${
			error?.status
		}`;

	return (
		<Container maxWidth="xl">
			<MotionInView variants={varFadeIn}>
				<CardHeader
					title="Расписание тренировок"
					sx={{ mb: 3 }}
					avatar={<Icon icon={baselineCalendarToday} width={26} height={26} />}
				/>
				<Scrollbar>
					<TableContainer sx={{ minHeight: 355 }}>
						{!data && (
							<SkeletonLoad
								num={5}
								variant="rectangular"
								height="60px"
								width="95%"
							/>
						)}

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
													user={user}
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
			</MotionInView>
		</Container>
	);
}
