import {
	getDocument,
	insertDocument,
	updateDocument,
	connectDatabase,
} from "../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}
	// Добавляет в базу новый оплаченный заказ
	// Увеличивает количество тренировок у пользователя
	if (req.method === "POST") {
		const userId = req.query.slug;
		const { order } = req.body;

		try {
			const user = await getDocument(client, "users", userId);

			if (!user) {
				res.status(404).json({ message: "user not found" });
				client.close();
				return;
			}
			//------------ добавляет оплаченный заказ в базу данных --------------------
			const { result, insertedId } = await insertDocument(
				client,
				"orders",
				order
			);

			if (!result.ok) {
				res
					.status(500)
					.json({ message: "Оплаченный заказ не добавлен в базу данных" });
			}
			//------------ добавляет пользователю тренировки  --------------------
			// eсли тип заказа group и присутствует поле qty добавляем количество тренировок
			// количество тренировок в заказе приводим к числу
			order.type === "group" && order.qty && (user.groups += Number(order.qty));
			// eсли тип заказа private и присутствует поле qty добавляем количество тренировок
			// количество тренировок в заказе приводим к числу
			order.type === "personal" &&
				order.qty &&
				(user.personals += Number(order.qty));

			const { result: userUpdateResult } = await updateDocument(
				client,
				"users",
				userId,
				user
			);

			if (!userUpdateResult.ok) {
				res.status(500).json({
					message:
						"Оплаченные тренировки не были добавлены. Пожалуйста, свяжитесь с администрацией",
				});
				return;
			}

			res.status(201).json({ insertedId, ok: 1 });
		} catch (error) {
			console.log("error.message", error.message);
			res.status(500).json({ message: "noOrder" });
		}
	}
	client.close();
}

export default handler;
