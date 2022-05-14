const sendgridMail = require("@sendgrid/mail");
const crypto = require("crypto");

import { resetPasswordMail } from "../../../../src/emails/auth-emails.js";
import { hashPassword } from "../../../../src/helpers/auth.js";

import {
	connectDatabase,
	getUserByEmail,
	getUserByToken,
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

	if (req.method === "POST") {
		const email = req.query.slug;
		const { locale } = req.body;

		// легкая валидация на уровне сервера
		if (!email || !email.includes("@")) {
			res.status(422).json({ message: "invalidInput" });
			return;
		}

		try {
			const user = await getUserByEmail(client, "users", email);
			const userId = user._id;

			// создаем токен и время жизни для ссылки на изменение пароля
			crypto.randomBytes(32, async (error, buffer) => {
				//! собственное решение ПРОВЕРИТЬ!
				if (error) {
					res.status(404).json({
						message:
							"Error: [/api/users/new-password/[slug]] crypto.randomBytes()",
					});
					return;
				}

				const token = buffer.toString("hex"); //! выяснить про буффер и hex

				if (user) {
					user.resetToken = token;
					user.resetTokenExp = Date.now() + 60 * 60 * 1000;

					const { result } = await updateDocument(
						client,
						"users",
						userId,
						user
					);
					//! проверить отключив базу
					if (!result.ok) {
						res.json({ message: "User not updated" });
						return;
					}

					//@ send reset password mail
					sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

					//! проверить испортив SENDGRID_API_KEY
					await sendgridMail
						.send(resetPasswordMail(email, token, locale))
						.then(() => {
							console.log("Reset Password Email sent");
						})
						.catch((error) => {
							res.status(500).json({ message: error.message });
							return;
						});
				} else {
					res.json({ message: "Email not found" });
					return;
				}
			});

			res.status(200).json({ email: user.email });
			return;
		} catch (error) {
			res.status(500).json({ message: "Не удалось найти аккаунт!" });
			return;
		}
	}

	if (req.method === "PATCH") {
		const token = req.query.slug;
		const { password } = req.body;

		try {
			const user = await getUserByToken(client, "users", token);
			const userId = user._id;

			if (!user || !password || password.trim().length < 5) {
				res.status(422).json({ message: "Неверные данные" });
				return;
			}

			const hashedPassword = await hashPassword(password);

			if (password) {
				user.password = hashedPassword;
				user.resetToken = undefined;
				user.resetTokenExp = undefined;
			}

			const { result } = await updateDocument(client, "users", userId, user);

			res.status(200).json(result);
			return;
		} catch (error) {
			res.status(500).json({
				message: "К сожалению, ссылка на изменение пароля устарела.",
			});
			return;
		}
	}
}

export default handler;
