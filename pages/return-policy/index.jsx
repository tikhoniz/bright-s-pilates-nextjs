import { styled } from "@mui/material";
import React from "react";
import Page from "../../src/components/Page";
import withTermsLayout from "../../src/layouts/TermsLayout";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	//display: "flex",
	//minHeight: "100%",
	//alignItems: "center",
	//paddingTop: theme.spacing(20),
	//paddingBottom: theme.spacing(25),
}));

// ----------------------------------------------------------------------

const privacyPolicy = () => {
	return (
		<RootStyle
			title="Политика возврата | Bright's Pilates"
			description="Правила возврата денежных средств"
		>
			<h1>Политика возврата</h1>
		</RootStyle>
	);
};

export default withTermsLayout(privacyPolicy);
