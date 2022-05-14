import React from "react";
import { Grid, Box } from "@mui/material";
import PricingCard from "./PricingCard";
import { MotionInView, varFadeIn, varFadeInUp } from "../animate";

const PricingBlock = ({ keys, block, placeOrderHandler, isDesktop }) => {
	return (
		<MotionInView variants={varFadeIn}>
			<Box
				sx={{
					position: "relative",
					padding: "24px 24px 40px",
					//maxWidth: 1200,
					margin: "0 auto",
				}}
			>
				<Grid container spacing={3}>
					{keys.map((key, index) => (
						<Grid item xs={12} md={4} key={index}>
							<PricingCard
								card={block[key]}
								index={index}
								placeOrderHandler={placeOrderHandler}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</MotionInView>
	);
};

export default PricingBlock;
