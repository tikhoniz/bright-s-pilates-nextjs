import { getSession } from "next-auth/react";
import { connectDatabase, getDocuments } from "../../../../src/helpers/db";

async function handler(req, res) {
	const session = await getSession({ req });

	const isAdmin =
		session?.user.email === process.env.admin ||
		session?.user.email === process.env.dev;

	if (!isAdmin) {
		res.status(500).json("Access is denied");
		return;
	}

	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	//Получает всех пользователей
	if (req.method === "GET") {
		try {
			const documents = await getDocuments(client, "users", {
				_id: -1, //отсортирует сначала новые
			});

			res.status(200).json(documents);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
	client.close();
}

export default handler;
