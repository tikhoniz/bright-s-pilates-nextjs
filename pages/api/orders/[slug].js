import { connectDatabase, getDocument } from "../../../src/helpers/db";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	// Получает оплаченный заказ по ID
	if (req.method === "GET") {
		try {
			const orderId = req.query.slug;
			const document = await getDocument(client, "orders", orderId);

			res.status(200).json(document);
		} catch (error) {
			res.status(500).json({ message: "noOrder" });
		}
	}
}

export default handler;
