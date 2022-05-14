const sendgridMail = require("@sendgrid/mail");
// emails
import { sendUserMessage } from "../../../src/emails/message-emails";
// utils
import { connectDatabase, insertDocument } from "../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}
	//  Создает новое сообщение
	if (req.method === "POST") {
		const {
			coach,
			request,
			subject,
			message,
			userName,
			userEmail,
			whatsappNumber,
			telegramAccount,
		} = req.body;

		try {
			const newMessage = {
				coach: coach || null,
				user: userEmail,
				request: request,
				subject: subject,
				message: message,
				response: null,
				whatsappNumber: whatsappNumber || null,
				telegramAccount: telegramAccount || null,
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			const response = await insertDocument(client, "messages", newMessage); // записываем новый id в newComment что  бы вывести в ответе

			if (!response.insertedId) {
				res.status(500).json({ message: "Не удалось создать сообщение!" });
				return;
			}

			sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

			//! проверить испортив SENDGRID_API_KEY
			await sendgridMail
				.send(
					sendUserMessage({
						coach,
						subject,
						message,
						userName,
						userEmail,
						whatsappNumber,
						telegramAccount,
					})
				)
				.then(() => {
					console.log("User message Email sent");
				})
				.catch((error) => {
					console.log(error.message);
				});

			res.status(201).json(response);
			return;
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Не удалось создать сообщение!" });
			return;
		}
	}
	// close connect to database
	client.close();
}

export default handler;
