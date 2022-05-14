import React from "react";
// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import Pricing from "../../src/components/pricing";

//-------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(14),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(19),
		paddingBottom: theme.spacing(10),
	},
}));

//-------------------------------------------------

const PricingPage = () => {
	return (
		<RootStyle
			title="Стоимость | Bright's Pilates"
			description="Приобретайте пакеты тренировок со скидкой и тренируйтесь в любом удобном месте"
		>
			<Pricing />
		</RootStyle>
	);
};

export default PricingPage;
