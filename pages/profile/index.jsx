// next
import { getSession } from "next-auth/react";
// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import Profile from "../../src/components/profile";
//-------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(14),
	paddingBottom: theme.spacing(5),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(19),
		paddingBottom: theme.spacing(10),
	},
}));

//-------------------------------------------------
const ProfilePage = () => {
	return (
		<RootStyle
			title="Личный профиль | Bright's Pilates"
			description="Личный кабинет пользователя онлайн студии пилатеса"
		>
			<h1 className="visually-hidden">Профиль</h1>

			<Profile />
		</RootStyle>
	);
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	if (!session || !session.user) {
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

export default ProfilePage;
