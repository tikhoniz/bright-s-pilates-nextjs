import { getSession } from "next-auth/react";

const SingleWorkoutPage = () => {
	return <div />;
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	const isAdmin =
		session?.user.email === process.env.admin ||
		session?.user.email === process.env.dev;

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

export default SingleWorkoutPage;
