import useSWR from "swr";
import { useSession } from "next-auth/react";

function useUserGroupClasses(options) {
	const { data: session, status } = useSession();

	let email = null;

	if (status === "authenticated") {
		const { user } = session;
		email = user?.email;
	}

	const { data, error, isValidating } = useSWR(
		email ? `/api/classes/user/${email}` : null,
		options
	);

	return {
		classes: data ?? [],
		isLoading: !error && !data,
		isError: error,
		isValidating: isValidating,
	};
}

export default useUserGroupClasses;
