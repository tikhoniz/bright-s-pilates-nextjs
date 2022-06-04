import useSWR from "swr";

function useGroupClass(id) {
	const { data, error, isValidating } = useSWR(`/api/classes/groups/${id}`);

	return {
		cls: data,
		isLoading: !error && !data,
		isError: error,
		isValidating: isValidating,
	};
}

export default useGroupClass;
