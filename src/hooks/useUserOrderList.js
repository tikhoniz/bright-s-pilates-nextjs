import useSWR from "swr";
import { useSession } from "next-auth/react";

function useUserOrderList(options) {
	const { data: session, status } = useSession();

	const { user } = session ?? {};
	const userEmail = user?.email;

	const { data, error } = useSWR(
		userEmail ? `/api/orders/user/${userEmail}` : null,
		options
	);

	return {
		userOrders: data ?? {},
		isLoading: !error && !data,
		isError: error,
	};
}

export default useUserOrderList;
