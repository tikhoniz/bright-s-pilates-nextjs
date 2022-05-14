import useSWR from "swr";
import { useSession, signOut } from "next-auth/react";

function useUser() {
	const { data: session, status } = useSession();

	//console.log("session", session);

	const { user } = session ?? {};
	const userEmail = user?.email;

	//const userEmail = "skdjksjksd";
	//const userEmail = "skdjksjksd@ygygy.sks";

	const { data, error, isValidating, mutate } = useSWR(
		userEmail ? `/api/users/${userEmail}` : null
	);

	if (error?.info === "noUser") signOut();

	delete data?.createdAt;
	delete data?.lastLogin;
	delete data?.updatedAt;
	delete data?.password;

	return {
		user: data ?? {},
		isLoading: !error && !data,
		isError: error,
		isValidating: isValidating,
		mutate: mutate,
	};
}

export default useUser;
