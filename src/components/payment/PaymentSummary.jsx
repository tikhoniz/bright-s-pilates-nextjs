// material
import { styled } from "@mui/material";
import { Divider, Typography, Stack, Grid } from "@mui/material";
// components
import Label from "../Label";
import StripeCheckout from "./StripeCheckout";
import PayPalCheckout from "./PayPalCheckout";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	padding: theme.spacing(2),
	paddingTop: theme.spacing(3),
	paddingBottom: theme.spacing(3),
	[theme.breakpoints.up("md")]: {
		padding: theme.spacing(3),
	},
}));

// ----------------------------------------------------------------------

export default function PaymentSummary({ order, paymentMethod }) {
	const { description, type, regularPrice, discount, discountPrice, qty } =
		order;

	return (
		<RootStyle>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={5} md={12}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="subtitle1">Ваша покупка:</Typography>
					</Stack>
					<Stack spacing={2.5}>
						<Stack direction="row" justifyContent="space-between">
							<Typography
								component="p"
								sx={{
									color: "text.secondary",
									fontSize: { xs: 23, sm: 17, md: 34 },
								}}
							>
								{description}{" "}
								{type === "group"
									? "в группе"
									: "персональн" + (qty === 1 ? "ая" : "ых")}
							</Typography>
						</Stack>

						{discount && (
							<Stack
								direction="row"
								justifyContent="space-between"
								sx={{
									position: "relative",
								}}
							>
								<Typography variant="h6" component="p">
									Cтоимость
								</Typography>

								<Stack>
									<Label color="warning" variant="ghost">
										Скидка {discount}
									</Label>
									<Stack direction="row" justifyContent="flex-end">
										<Typography
											variant="h4"
											sx={{
												color: "text.secondary",
											}}
										>
											$
										</Typography>
										<Typography
											variant="h3"
											sx={{
												mx: 1,
												color: "text.secondary",
												textDecoration: "line-through",
											}}
										>
											{regularPrice}
										</Typography>
									</Stack>
								</Stack>
							</Stack>
						)}

						<Divider sx={{ borderStyle: "dashed" }} />

						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<Typography variant="h6" component="p">
								Сумма:
							</Typography>

							<Stack direction="row" justifyContent="flex-end">
								<Typography variant="h4">$</Typography>
								<Typography variant="h3" component="p" sx={{ mx: 1 }}>
									{discount ? discountPrice : regularPrice}
								</Typography>
							</Stack>
						</Stack>

						<Divider sx={{ borderStyle: "dashed", mb: 1 }} />
					</Stack>
					<Typography variant="caption" sx={{ color: "text.secondary", mt: 1 }}>
						* все налоги включены
					</Typography>
				</Grid>

				<Grid item xs={12} sm={7} md={12}>
					{paymentMethod === "paypal" && <PayPalCheckout order={order} />}
					{paymentMethod === "credit_card" && <StripeCheckout order={order} />}
				</Grid>
			</Grid>
		</RootStyle>
	);
}
