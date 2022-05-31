import { connectDatabase, getDocument } from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	// Получает класс по ID пользователя
	if (req.method === "GET") {
		try {
			const cls = await getDocument(client, "groups", req.query.slug);
			delete cls.title;
			delete cls.creator;
			delete cls.createdAt;
			delete cls.updatedAt;
			delete cls.participants;

			res.status(200).json(cls);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
	client.close();
}

export default handler;
