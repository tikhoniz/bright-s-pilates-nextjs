import React from "react";
// next
import { getSession } from "next-auth/react";
// material
import { styled } from "@mui/material";
//components
import Page from "../../src/components/Page";
import Dashboard from "../../src/components/admin-dashboard/Dashboard";

//---------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(15),
}));
//---------------------------------------------------------------------

const AdminDashboardPage = () => {
	return (
		<RootStyle
			title="Панель администратора | Bright's Pilates"
			description="Панель администратора"
		>
			<Dashboard />
		</RootStyle>
	);
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	const isAdmin =
		session?.user?.email === process.env.admin ||
		session?.user?.email === process.env.dev;

	if (!session || !isAdmin) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default AdminDashboardPage;
