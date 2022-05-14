import React, { useMemo, useState } from "react";
// material
import {
	Card,
	Stack,
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	CardHeader,
	Typography,
	TableContainer,
	TablePagination,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

// utils
import {
	humanReadableDate,
	humanReadableTime,
	humanReadableWeekday,
} from "../../utils/time";
import { filterComletedClasses } from "../../utils/filters";
// store
// icons
import PaymentIcon from "../icons/icon_payment";
import NotPaymentIcon from "../icons/icon_not_payment";
// extend
import MAvatar from "../@material-extend/MAvatar";
import useUserGroupClasses from "../../hooks/useUserGroupClasses";

// ----------------------------------------------------------------------

const UpcomingClass = ({ cls }) => {
	const { coach, title, avatar, startTime, freeAccess } = cls;

	return (
		<TableRow>
			<TableCell>
				<Stack sx={{ whiteSpace: "nowrap" }}>
					<time dateTime={startTime}>
						{humanReadableWeekday(startTime, "ru-RU")}
					</time>
					<time dateTime={startTime}>
						{humanReadableDate(startTime, "ru-RU")}
					</time>
					<time dateTime={startTime}>
						в {humanReadableTime(startTime, "ru-RU")}
					</time>
				</Stack>
			</TableCell>

			<TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
				{title}
			</TableCell>

			<TableCell>
				<Stack direction="row" alignItems="center" spacing={2}>
					<MAvatar
						alt={coach}
						src={avatar}
						sx={{ display: { xs: "none", sm: "block" } }}
					/>
					<Typography variant="subtitle2">{coach}</Typography>
				</Stack>
			</TableCell>

			<TableCell>
				{freeAccess ? (
					<NotPaymentIcon sx={{ height: 30 }} />
				) : (
					<PaymentIcon sx={{ height: 30, minWidth: 30 }} />
				)}
			</TableCell>
		</TableRow>
	);
};

const ClassesCompleted = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));

	// получение списка групповых тренировок пользователя, обновляется при переключении вкладок или через 5 минут
	const { classes, isLoading, isError } = useUserGroupClasses({
		refreshInterval: 300000,
		revalidateIfStale: true,
	});

	const completed = useMemo(
		() => filterComletedClasses(classes, 60),
		[classes]
	);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Card>
			<CardHeader title="Завершённые тренировки" sx={{ mb: 3 }} />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Дата</TableCell>
							{isTablet && <TableCell>Название</TableCell>}
							<TableCell>Тренер</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{completed
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item) => {
								return <UpcomingClass key={item._id} cls={item} />;
							})}
						{completed.length < 1 && (
							<TableRow>
								<TableCell align="center" colSpan={"100%"}>
									<Typography
										variant="overline"
										sx={{ mb: 1, display: "block", color: "text.secondary" }}
									>
										Нет записей
									</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				labelRowsPerPage={isTablet ? "Тренировок на странице" : ""}
				rowsPerPageOptions={[5, 10, 25, 50]}
				component="div"
				count={completed.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Card>
	);
};

export default ClassesCompleted;
