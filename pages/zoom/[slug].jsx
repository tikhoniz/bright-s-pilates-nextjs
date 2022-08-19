import React from "react";
// next
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
// hooks
import useGroupClass from "../../src/hooks/useGroupClass";
// components
import Zoom from "../../src/components/zoom/Zoom";

const ZoomPage = ({ user }) => {
	const router = useRouter();
	const { cls, isLoading, isError } = useGroupClass(router?.query?.slug);

	return (
		<>
			<Head>
				<meta httpEquiv="originTrial" content={process.env.zoom_google_token} />
				<meta name="robots" content="noindex, nofollow" />
				<link
					type="text/css"
					rel="stylesheet"
					href="https://source.zoom.us/2.6.0/css/bootstrap.css"
				/>
				<link
					type="text/css"
					rel="stylesheet"
					href="https://source.zoom.us/2.6.0/css/react-select.css"
				/>
			</Head>
			{isError && "Ошибка конференции Zoom"}
			{!isLoading && <Zoom user={user} onlineClass={cls} />};
		</>
	);
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	if (!session || !session?.user) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: {
			user: session.user,
		},
	};
}

export default ZoomPage;
