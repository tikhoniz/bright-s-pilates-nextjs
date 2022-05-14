import React from "react";
import Head from "next/head";

import PrivacyPolicy from "../../src/components/policy/PrivacyPolicy";
import withTermsLayout from "../../src/layouts/TermsLayout";

const privacyPolicy = () => {
	return (
		<>
			<Head>
				<title>Политика конфиденциальности | Online Pilates studio</title>
				<meta name="robots" content="noindex, nofollow" />
			</Head>

			<h1 className="visually-hidden">Политика конфиденциальности</h1>

			<PrivacyPolicy />
		</>
	);
};

export default withTermsLayout(privacyPolicy);
