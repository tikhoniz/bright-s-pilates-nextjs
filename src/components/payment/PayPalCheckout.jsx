import React, { useEffect, useState } from "react";
// next
import { useRouter } from "next/router";
import { PayPalButton } from "react-paypal-button-v2";
// hooks
import useUser from "../../hooks/useUser";
// utils
import { createPayPalPaidOrder } from "../../helpers/api/api-payment";
// material
import { Grid, Skeleton, Stack, Paper } from "@mui/material";

const PayPalCheckout = ({ order }) => {
	const [sdkReady, setSdkReady] = useState(false);
	const { user } = useUser();
	const router = useRouter();

	//запускает скрипт paypal
	useEffect(() => {
		const addPayPalScript = async () => {
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.paypal_client_id}&currency=USD`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!window.paypal) {
			addPayPalScript().then((err) => console.log("error", err));
			// todo: обработать добавление PayPal на ошибки
		} else {
			setSdkReady(true);
		}
	}, []);

	const { id, qty, type, discount, description, regularPrice, discountPrice } =
		order;
	const { _id, name, email } = user || {};

	// при успешной оплате обновляет заказ и пользователя
	async function successPaymentHandler(paymentResult) {
		const paidOrder = {
			userId: _id,
			orderId: id,
			userName: name,
			userEmail: email,
			description,
			type,
			qty,
			regularPrice,
			discount: discount || null,
			discountPrice: discountPrice || null,
			paymentMethod: "PayPal",
			paymentResult: paymentResult,
			createdAt: new Date(),
		};
		const response = await createPayPalPaidOrder(paidOrder);

		if (!response.ok) {
			console.log(
				"Оплаченные тренировки не были добавлены. Пожалуйста, свяжитесь с администрацией",
				response.message
			);
			return;
		}
		router.push(`/success/payPal_${response.insertedId}`);
	}

	return (
		<Paper
			sx={{
				p: 2.5,
				minHeight: 206,
			}}
		>
			{sdkReady ? (
				<PayPalButton
					amount={
						order.discountPrice ? order.discountPrice : order.regularPrice
					}
					currency="USD"
					description={order.name}
					onSuccess={successPaymentHandler}
					onError={() => console.log("error")}
					//onClick={loading.onChange}
					//onCancel={onCancel}
				/>
			) : (
				<Stack spacing={2} sx={{ mb: 10 }}>
					{[...Array(2)].map((_, index) => (
						<Grid item xs={12} sm={12} md={12} key={index}>
							<Skeleton
								variant="rectangular"
								width="100%"
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
			)}
		</Paper>
	);
};

export default PayPalCheckout;
