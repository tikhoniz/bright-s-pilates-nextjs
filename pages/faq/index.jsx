import React from "react";
// material
import { styled } from "@mui/material/styles";
// data
// components
import Page from "../../src/components/Page";
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

const FAQPage = () => {
	return (
		<RootStyle
			title="FAQ | Bright's Pilates"
			description="FAQ Самые часто задаваемые вопросы"
		>
			<div></div>
		</RootStyle>
	);
};

export function getStaticProps() {
	return {
		props: {},
	};
}

export default FAQPage;
