import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/react";
// material
import { useTheme, useMediaQuery } from "@mui/material";
import { Container, Box } from "@mui/material";
//components
import TogglePrice from "./TogglePrice";
import Payment from "../payment/Payment";
import DescriptionPrice from "./DescriptionPrice";
import PricingBlock from "./PricingBlock";
// data
import PLANS from "../../data/plans";
import { MotionInView, varFadeIn, varFadeInDown } from "../animate";

function Pricing() {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

	const [order, placeOrder] = useState(null);
	const [currentPrice, setCurrentPrice] = useState("group");

	const { status } = useSession();

	const router = useRouter();

	// функция вызывается в PricingCard передает выбранный блок для оплаты
	function placeOrderHandler(order) {
		if (status !== "loading" && status === "unauthenticated") {
			return router.push("/auth");
		}

		placeOrder(order);
	}

	const tooglePriceHandler = (event) => {
		const { value } = event.target;
		setCurrentPrice(value);
	};

	const groupList = PLANS.group;
	const personalList = PLANS.personal;

	const keysGroup = Object.keys(groupList);
	const keysPersonal = Object.keys(personalList);

	return (
		<Container maxWidth="xl">
			{!order && (
				<Box sx={{ position: "relative", height: { xs: 2300, md: 966 } }}>
					<Box
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
						}}
					>
						{!order && (
							<>
								<MotionInView variants={varFadeIn}>
									<DescriptionPrice />
								</MotionInView>

								<MotionInView variants={varFadeIn}>
									<TogglePrice
										tooglePriceHandler={tooglePriceHandler}
										checked={currentPrice}
									/>
								</MotionInView>

								{currentPrice === "group" && (
									<PricingBlock
										keys={keysGroup}
										block={groupList}
										isDesktop={isDesktop}
										placeOrderHandler={placeOrderHandler}
									/>
								)}

								{currentPrice === "personal" && (
									<PricingBlock
										keys={keysPersonal}
										block={personalList}
										isDesktop={isDesktop}
										placeOrderHandler={placeOrderHandler}
									/>
								)}
							</>
						)}
					</Box>
				</Box>
			)}

			{order && (
				<Box sx={{ mb: { xs: 40, md: 0 } }}>
					<MotionInView variants={varFadeIn}>
						<Payment order={order} placeOrder={placeOrder} />
					</MotionInView>
				</Box>
			)}
		</Container>
	);
}

export default Pricing;
