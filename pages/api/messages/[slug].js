import {
	connectDatabase,
	getDocument,
	getFilteredDocuments,
	updateDocument,
} from "../../../src/helpers/db";
import useAdmin from "../../../src/hooks/useAdmin";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	//* Получает все сообщения пользователя
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

	//* Обновление сообщения пользователя(admin)
	if (req.method === "PATCH") {
		const isAdmin = useAdmin(req);

		if (!isAdmin) {
			res.status(500).json("Access is denied");
			return;
		}

		const messageId = req.query.slug;
		try {
			const document = await getDocument(client, "messages", messageId);
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
