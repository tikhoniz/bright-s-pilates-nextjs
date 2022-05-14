import useSWR from "swr";
import { useSession } from "next-auth/react";

function useUserList() {
	const { data: session, status } = useSession();

	const { user } = session ?? {};
	const userEmail = user?.email;

	const { data, error } = useSWR(userEmail ? `/api/admin/users` : null);

	return {
		users: data ?? [],
		isLoading: !error && !data,
		isError: error,
	};
}

export default useUserList;
