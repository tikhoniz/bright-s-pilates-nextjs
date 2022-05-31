import { getSession } from "next-auth/react";

async function useAdmin(req) {
	const session = await getSession({ req });

	if (
		session?.user.email === process.env.admin ||
		session?.user.email === process.env.dev
	)
		return true;

	return false;
}

export default useAdmin;
