import { styled } from "@mui/material";
import React from "react";
import Page from "../../src/components/Page";
import TermsOfService from "../../src/components/policy/TermsOfService";
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

const TermsOfServicePage = () => {
	return (
		<RootStyle
			title="Правила пользования | Bright's Pilates"
			description="Правила в соответствии с которыми нужно пользоваться сайтом"
		>
			<h1 className="visually-hidden">Правила пользования</h1>

			<TermsOfService />
		</RootStyle>
	);
};

export default withTermsLayout(TermsOfServicePage);
