import { LoadingButton } from "@mui/lab";
import { Box, Link } from "@mui/material";
import { styled } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import StripeIcon from "../icons/payment/icon_stripe";

// ----------------------------------------------------------------------
const LinkStyle = styled(Link)(({ theme }) => ({
	color: "rgba(26, 26, 26, 0.5)",
	fontWeight: 400,
	fontSize: "14px",
	"&:hover": {
		textDecoration: "none",
	},
}));
// ----------------------------------------------------------------------

const StripeCheckout = ({ order }) => {
	const [redirect, setRedirect] = useState(false);
	const { user, isLoading, isError } = useUser();

	const redirectToCheckoutHandler = async () => {
		setRedirect(true);
		// Формирует заказ в формате Stripe в /api/payment/stripe/session и возвращает объект checkout.session
		// из которого забирается id
		const { id } = await fetch(`/api/payment/stripe/session`, {
			method: "POST",
			body: JSON.stringify({
				user,
				order,
				items: [
					{
						price: order.stripePriceId,
						quantity: 1,
					},
				],
			}),
			headers: { "Content-Type": "application/json" },
		}).then(async (response) => {
			if (response.ok) {
				return await response.json();
			} else {
				//если ответ не response.ok
				const data = await response.json();
				throw new Error(data.message || "Something went wrong!");
			}
		});

		// создает копию загрузки страйпа
		const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
		// запускает на объекте stripe функцию redirectToCheckout
		// достает из ответа id заказа и вызывает api/payment/stripe/[id]
		console.log("sessionId", id);
		await stripe.redirectToCheckout({ sessionId: id });
	};

	return (
		<>
			<LoadingButton
				fullWidth
				size="large"
				type="submit"
				variant="contained"
				loading={redirect}
				onClick={redirectToCheckoutHandler}
				sx={{
					mt: 5,
					mb: 3,
					borderRadius: "6px",
					backgroundColor: "#343145",
					"&:hover": {
						backgroundColor: "#343145",
					},
				}}
			>
				<Box
					component="span"
					sx={{
						opacity: 0.5,
						fontWeight: 400,
						fontSize: 18,
						letterSpacing: 1,
					}}
				>
					{`Оплатить $${
						order.discountPrice ? order.discountPrice : order.regularPrice
					}`}
				</Box>
			</LoadingButton>
			<LinkStyle
				href="https://stripe.com/"
				target="_blank"
				sx={{
					display: "flex",
					cursor: "pointer",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				Powered by
				<StripeIcon width={35} height={27} marginLeft={0.5} />
			</LinkStyle>
		</>
	);
};

export default StripeCheckout;
