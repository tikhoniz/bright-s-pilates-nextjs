import {
	connectDatabase,
	getDocumentById,
	insertDocument,
	updateDocument,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;

	//try {
	//	client = await connectDatabase();
	//} catch (error) {
	//	res.status(500).json({ message: "Connected to the database failed" });
	//	return;
	//}
	////***************************************************/
	////****** Создает оплаченный заказ пользователя ******/
	////***************************************************/
	//if (req.method === "POST") {
	//	const userId = req.query.slug;

	//	try {
	//		const user = await getDocumentById(client, "users", userId);

	//		if (!user) {
	//			res.status(404).json({ message: "user not found" });
	//			// close connect to database
	//			client.close();
	//			return;
	//		}

	//		const {
	//			id,
	//			qty,
	//			type,
	//			caption,
	//			discount,
	//			description,
	//			regularPrice,
	//			discountPrice,
	//		} = req.body.order;

	//		const { _id, name, email } = user;

	//		const paidOrder = {
	//			userId: _id,
	//			userName: name,
	//			userEmail: email,
	//			orderId: id,
	//			description: description,
	//			type: type,
	//			qty: qty,
	//			regularPrice,
	//			discount: discount || null,
	//			discountPrice: discountPrice || null,
	//			save: caption,
	//			paymentMethod: "PayPal",
	//			paymentResult: req.body.paymentResult,
	//			createdAt: new Date(),
	//		};
	//		//------------ добавляет оплаченный заказ в базу данных --------------------
	//		const { result } = await insertDocument(client, "orders", paidOrder);

	//		if (!result.ok) {
	//			res
	//				.status(500)
	//				.json({ message: "Оплаченный заказ не добавлен в базу данных" });
	//		}
	//		//------------ добавляет пользователю тренировки  --------------------

	//		// eсли тип заказа group и присутствует поле qty добавляем количество тренировок
	//		// количество тренировок в заказе приводим к числу
	//		type === "group" && qty && (user.groups += Number(qty));
	//		// eсли тип заказа private и присутствует поле qty добавляем количество тренировок
	//		// количество тренировок в заказе приводим к числу
	//		type === "personal" && qty && (user.personals += Number(qty));

	//		const { result: userUpdateResult } = await updateDocument(
	//			client,
	//			"users",
	//			userId,
	//			user
	//		);

	//		res.status(201).json({ userUpdateResult });
	//	} catch (error) {
	//		res.status(500).json({ message: "noOrder" });
	//	}
	//}

	// close connect to database
	client.close();
}

export default handler;
