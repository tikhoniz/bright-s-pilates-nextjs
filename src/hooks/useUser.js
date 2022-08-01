import useSWR from "swr";
import { useSession, signOut } from "next-auth/react";

function useUser(options) {
	const { data: session, status } = useSession();
	let email = null;

	if (status === "authenticated") {
		const { user } = session;
		email = user?.email;
	}

	const { data, error, isValidating, mutate } = useSWR(
		email ? `/api/users/${email}` : null,
		options
	);

	if (error?.info === "noUser") signOut();

	return {
		user: data ?? {},
		isLoading: !error && !data,
		isError: error,
		isValidating: isValidating,
		mutate: mutate,
	};
}

export default useUser;
