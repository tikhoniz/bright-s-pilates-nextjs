import useSWR from "swr";
import { useSession } from "next-auth/react";

function useUserOrderList(options) {
	const { data: session, status } = useSession();

	let email = null;

	if (status === "authenticated") {
		const { user } = session;
		email = user?.email;
	}
	const { data, error } = useSWR(
		email ? `/api/orders/user/${email}` : null,
		options
	);

	return {
		userOrders: data ?? {},
		isLoading: !error && !data,
		isError: error,
	};
}

export default useUserOrderList;
