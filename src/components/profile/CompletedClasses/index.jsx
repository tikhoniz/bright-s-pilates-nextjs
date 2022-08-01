import React, { useMemo, useState } from "react";
// material
import {
	Card,
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
import { filterComletedClasses } from "../../../utils/filters";
// extend
import useUserGroupClasses from "../../../hooks/useUserGroupClasses";
// components
import ComletedClassRow from "./CompletedClassRow";
import SkeletonLoad from "../../UI/skeleton/Skeleton";

// ----------------------------------------------------------------------

const CompletedClasses = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));

	// получение списка групповых тренировок пользователя, обновляется при переключении вкладок или через 5 минут
	const { classes, isLoading } = useUserGroupClasses({
		refreshInterval: 300000,
		revalidateIfStale: true,
	});

	const filtered = useMemo(() => filterComletedClasses(classes, 60), [classes]);

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
						{isLoading && (
							<TableRow>
								<TableCell colSpan={"100%"}>
									<SkeletonLoad
										num={3}
										height={50}
										width={"98%"}
										sx={{ margin: "10px" }}
									/>
								</TableCell>
							</TableRow>
						)}

						{filtered
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((item) => {
								return <ComletedClassRow key={item._id} cls={item} />;
							})}

						{filtered.length < 1 && (
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
				count={filtered.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Card>
	);
};

export default CompletedClasses;
