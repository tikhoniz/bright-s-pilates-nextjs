import {
	updateDocument,
	getUserByEmail,
	getDocumentById,
	connectDatabase,
} from "../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res
			.status(500)
			.json({ message: "Connected to the database failed [api/users/[slug]" });
		return;
	}

	// Получает пользователя по email *//
	if (req.method === "GET") {
		const email = req.query.slug;
		// легкая валидация на уровне сервера
		if (!email || !email.includes("@")) {
			// изменить сообщение об ошибки
			res.status(422).json({ message: "Указан неверный формат почты" });
			return;
		}

		try {
			const user = await getUserByEmail(client, "users", email);

			if (!user) {
				res.status(500).json({ message: "noUser" });
			}

			res.status(200).json(user);
			return;
		} catch (error) {
			res.status(500).json({ message: error.message });
			return;
		}
	}
	//
	//* Изменяет данные пользователя по ID *//
	//
	if (req.method === "PATCH") {
		const userId = req.query.slug;
		const {
			city,
			about,
			cover,
			avatar,
			country,
			phoneNumber,
			displayName,
			displayLastName,
		} = req.body;

		try {
			const document = await getDocumentById(client, "users", userId);

			if (document) {
				if (avatar !== undefined) {
					document.image = avatar;
				}
				document.cover = cover;
				document.name = displayName;
				document.lastName = displayLastName;
				document.about = about;
				document.country = country;
				document.city = city;
				document.phoneNumber = phoneNumber;
				document.updatedAt = new Date();
			} else {
				res.status(404).json({
					message: "Не удалось получить пользователя из базы данных",
				});
				return;
			}

			const { result } = await updateDocument(
				client,
				"users",
				userId,
				document
			);

			res.status(200).json(result);
		} catch (error) {
			res
				.status(500)
				.json({ message: "Не удалось обновить профиль пользователя" });
		}
	}

	//*************************************************************/
	//**** Изменение даты последнего входа пользователя по ID *****/
	//*************************************************************/
	if (req.method === "PUT") {
		const userId = req.query.slug;
		try {
			const document = await getDocumentById(client, "users", userId);

			if (document) {
				document.lastLogin = new Date();
			} else {
				res.status(404).json({
					message: "Не удалось получить пользователя из базы данных",
				});
				return;
			}

			const { result } = await updateDocument(
				client,
				"users",
				userId,
				document
			);

			res.status(200).json(result);
		} catch (error) {
			res
				.status(500)
				.json({ message: "Обновить данные профиля пользователя не удалось" });
		}
	}
}

export default handler;
