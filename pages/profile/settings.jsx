// next
import { useRouter } from "next/router";
// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import UserSettings from "../../src/components/profile/UserSettings";
import { getSession } from "next-auth/react";
import useUser from "../../src/hooks/useUser";

//-------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(25),
		paddingBottom: theme.spacing(20),
	},
}));

//-------------------------------------------------
const ProfileSettingPage = () => {
	const { user, isLoading, isError } = useUser();

	const router = useRouter();
	// Make sure we're in the browser
	if (!user && typeof window !== "undefined") {
		router.push("/profile");
	}

	if (isLoading) return "загрузка...";
	if (isError) return "ОШИБКА...";
	return (
		<RootStyle
			title="Редактирование личного профиля | Bright's Pilates"
			description="Изменение данных пользователя"
		>
			<h1 className="visually-hidden">Настройка профиля</h1>
			<UserSettings user={user} router={router} />
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

export default ProfileSettingPage;
