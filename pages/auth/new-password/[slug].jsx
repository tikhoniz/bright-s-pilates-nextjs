import { useRouter } from "next/router";
import Head from "next/head";

import NewPasswordForm from "../../../src/components/authentication/NewPasswordForm";
import { getSession } from "next-auth/react";

const NewPasswordPage = () => {
	const router = useRouter();

	const { slug } = router.query;

	return (
		<>
			<Head>
				<title>newPassTitle| Online Pilates studio</title>
				<meta name="robots" content="noindex, nofollow" />
			</Head>

			<h1 className="visually-hidden">"newPassTitle"</h1>

			<NewPasswordForm token={slug} router={router} />
		</>
	);
};

// защита страниц от просмотра если пользователь не залогинен
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });

	if (session) {
		return {
			// перейти на страницу входа
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	//если юзер войден
	return { props: { session: session } };
}

export default NewPasswordPage;
