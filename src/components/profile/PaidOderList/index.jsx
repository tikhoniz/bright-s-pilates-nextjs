import React, { useState } from "react";
// material
import {
	Card,
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	Typography,
	CardHeader,
	TableContainer,
	TablePagination,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
// components
import SkeletonLoad from "../../UI/skeleton/Skeleton";
import PaidOrderRow from "./PaidOrderRow";
// hooks
import useUserOrderList from "../../../hooks/useUserOrderList";

const PaidOrderList = () => {
	const { userOrders, isLoading, isError } = useUserOrderList({
		revalidateIfStale: true,
	});

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const theme = useTheme();
	const isTablet = useMediaQuery(theme.breakpoints.up("sm"));

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (isError)
		return `${isError}: ${renderMessage(isError.info)}. Код ошибки: ${
			isError.status
		}`;

	return (
		<Card>
			<CardHeader title="Счета" sx={{ mb: 3 }} />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Дата</TableCell>
							<TableCell>Блок</TableCell>
							<TableCell>Сумма</TableCell>
							{isTablet && <TableCell>Оплачено</TableCell>}
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

						{!isLoading &&
							userOrders
								.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((item) => {
									return <PaidOrderRow key={item._id} order={item} />;
								})}

						{!isLoading && userOrders.length < 1 && (
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
				labelRowsPerPage={isTablet ? "Счетов на странице" : ""}
				rowsPerPageOptions={[5, 10, 25, 50]}
				component="div"
				count={(!isLoading && userOrders.length) || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Card>
	);
};

export default PaidOrderList;

//description: "10 тренировок"
//createdAt: "2021-10-07T17:13:08.970Z"
//discount: "25%"
//orderId: "ten-group"
//paymentMethod: "PayPal"
//paymentResult: {id: '3HP621378P432304M', intent: 'CAPTURE', status: 'COMPLETED', purchase_units: Array(1), payer: {…}, …}
//regularPrice: 120
//discountPrice: "90"
//qty: 10
//save: "скидка 30%"
//type: "в группе"
//userEmail: "brightspilates@gmail.com"
//userId: "615db5ca24d2ee4475d3f3c3"
//userName: "Coach"
//_id: "615f2aa4d3e3932da8146986"
