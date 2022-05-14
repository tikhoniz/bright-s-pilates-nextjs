import { useState } from "react";
// material
import { useTheme } from "@mui/material";
import {
	Box,
	Card,
	Grid,
	Container,
	Typography,
	useMediaQuery,
} from "@mui/material";
// components
import PaymentSummary from "./PaymentSummary";
import PaymentMethods from "./PaymentMethods";

// ----------------------------------------------------------------------

function Payment({ order, placeOrder }) {
	const [paymentMethod, setPaymentMethod] = useState("credit_card");

	const theme = useTheme();
	const upMd = useMediaQuery(theme.breakpoints.up("md"));

	return (
		<Container maxWidth="lg">
			<Box sx={{ mb: 5 }}>
				<Typography variant="h3" align="center" paragraph>
					Завершение оплаты
				</Typography>
				<Typography align="center" sx={{ color: "text.secondary" }}>
					Выберите удобный способ оплаты
				</Typography>
			</Box>
			<Grid container spacing={upMd ? 5 : 2}>
				<Grid item xs={12} md={5}>
					<Card>
						<PaymentMethods
							placeOrder={placeOrder}
							paymentMethod={paymentMethod}
							setPaymentMethod={setPaymentMethod}
						/>
					</Card>
				</Grid>

				<Grid item xs={12} md={7}>
					<Card>
						<PaymentSummary order={order} paymentMethod={paymentMethod} />
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Payment;
