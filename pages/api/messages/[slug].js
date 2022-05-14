import { connectDatabase, getFilteredDocuments } from "../../../src/helpers/db";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	if (req.method === "GET") {
		try {
			const userEmail = req.query.slug;

			const documents = await getFilteredDocuments(
				client,
				"messages",
				{
					user: userEmail, //  фильтрует по email
					request: "profile", // фильтрует только сообщения отправленные из профиля
				},
				{
					_id: -1, //отсортирует сначала новые
				}
			);
			res.status(200).json(documents);
		} catch (error) {
			res.status(500).json({ message: "Getting messages failed" });
		}
	}
}

export default handler;
