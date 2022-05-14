// next
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
// components
import Authentication from "../../src/components/authentication/Authentication";

const AuthPage = () => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Вход в аккаунт | Online Pilates studio</title>
				<meta name="robots" content="noindex, nofollow" />
			</Head>

			<h1 className="visually-hidden">Вход в аккаунт</h1>

			<Authentication router={router} />
		</>
	);
};

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return { props: { session: session } };
}

export default AuthPage;
