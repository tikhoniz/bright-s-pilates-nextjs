import { getSession } from "next-auth/react";
import {
	updateDocument,
	connectDatabase,
	getDocumentById,
	//getFilteredDocuments,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	const session = await getSession({ req });

	const isAdmin =
		session?.user?.email === process.env.admin ||
		session?.user?.email === process.env.dev;

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

	// Обновление сообщения пользователя
	if (req.method === "PATCH") {
		const messageId = req.query.slug;
		try {
			const document = await getDocumentById(client, "messages", messageId);
			// приведение id mongo  к строке
			if (document._id.toString() === messageId) {
				document.response = req.body.answer || document.response;
				document.isAnswered = true;
				document.updatedAt = new Date();
			}

			const { result } = await updateDocument(
				client,
				"messages",
				messageId,
				document
			);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Updated message failed" });
		}
	}
}

export default handler;
