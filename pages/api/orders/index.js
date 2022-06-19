import { getSession } from "next-auth/react";
import {
	getDocuments,
	connectDatabase,
	insertDocument,
} from "../../../src/helpers/db";
import useAdmin from "../../../src/hooks/useAdmin";

async function handler(req, res) {
	const isAdmin = useAdmin(req);

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

	// Получает все оплаченные заказы
	if (req.method === "GET") {
		try {
			const orderList = await getDocuments(client, "orders");

			res.status(200).json(orderList);
		} catch (error) {
			res.status(500).json({ message: "Getting orders failed" });
		}
	}

	client.close();
}

export default handler;
