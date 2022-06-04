import useSWR from "swr";
import { useSession } from "next-auth/react";

function useUserGroupClasses(options) {
	const { data: session, status } = useSession();

	const { user } = session || {};
	const userEmail = user?.email;
	// to make mistakes
	//const userEmail = null;
	//const userEmail = undefined;
	//const userEmail = "yqwiqudhiuqdiuqdiqwd";
	//const userEmail = "user@user.com";

	const { data, error, isValidating } = useSWR(
		userEmail ? `/api/classes/user/${userEmail}` : null,
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
