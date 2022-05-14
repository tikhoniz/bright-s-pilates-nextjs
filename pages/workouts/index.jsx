import React from "react";
import { getSession } from "next-auth/react";

const AllWorkoutsPage = ({ workouts, session }) => {
	return <div />;
};

export async function getServerSideProps(ctx) {
	const session = await getSession(ctx);

	return {
		props: {
			session: session,
			workouts: allWorkouts,
		},
	};
}

export default AllWorkoutsPage;
