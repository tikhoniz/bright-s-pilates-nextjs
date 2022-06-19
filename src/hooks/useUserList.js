import useSWR from "swr";
import { useSession } from "next-auth/react";

function useUserList(options) {
	const { status } = useSession();

	const { data, error } = useSWR(
		status === "authenticated" ? `/api/users` : null,
		options
	);

	return {
		userList: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export default useUserList;
