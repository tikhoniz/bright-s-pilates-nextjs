import {
	connectDatabase,
	getFilteredDocuments,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	// Получает все  оплаченные заказы пользователя по email
	if (req.method === "GET") {
		try {
			const userEmail = req.query.slug;

			const documents = await getFilteredDocuments(
				client,
				"orders",
				{
					userEmail, //  фильтрует по юзеру
				},
				{
					_id: -1, //отсортирует сначала новые
				}
			);

			res.status(200).json(documents);
		} catch (error) {
			res.status(500).json({ message: "Getting orders failed" });
		}
	}
	// close connect to database
	client.close();
}

export default handler;
