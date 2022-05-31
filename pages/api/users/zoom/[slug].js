import {
	connectDatabase,
	getDocument,
	updateDocument,
} from "../../../../src/helpers/db.js";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}
	// Изменяет режим использования Zoom
	if (req.method === "PUT") {
		const userId = req.query.slug;
		const { mode } = req.body;

		try {
			const user = await getDocument(client, "users", userId);

			if (!user) {
				res.status(404).json({
					message: "Не удалось получить пользователя из базы данных",
				});
				return;
			}

			user.zoomApp = mode;
			user.updatedAt = new Date();

			const { result } = await updateDocument(client, "users", userId, user);

			res.status(200).json(result);
			return;
		} catch (error) {
			res.status(500).json({
				message: "Обновить данные профиля пользователя не удалось",
			});
			return;
		}
	}
}

export default handler;
