const sendgridMail = require("@sendgrid/mail");
// email
import { newUserMail } from "../../../src/emails/auth-emails";
// helpers
import { hashPassword } from "../../../src/helpers/auth";
import {
	connectDatabase,
	getUserByEmail,
	insertDocument,
} from "../../../src/helpers/db";

async function handler(req, res) {
	if (req.method !== "POST") {
		return;
	}

	const data = req.body;

	const { name, lastName, email, password } = data;

	// легкая валидация на уровне сервера
	if (!email || !email.includes("@")) {
		res.status(422).json({ message: "Еmail должен содержать @" });
		return;
	}

	if (!password || password.trim().length < 5) {
		res.status(422).json({ message: "Длина пароля не менее 5 знаков" });
		return;
	}

	try {
		const client = await connectDatabase();
		//проверка уникальности email
		const existingUser = await getUserByEmail(client, "users", email);

		if (existingUser) {
			res.status(422).json({ message: "Этот email уже зарегистрирован" });
			await client.close();
			return;
		}

		const hashedPassword = await hashPassword(password);

		const result = await insertDocument(client, "users", {
			name: name,
			lastName: lastName,
			email: email,
			password: hashedPassword,
			personals: 0,
			groups: 0,
			personalList: [],
			groupList: [],
			image: { url: null, id: null },
			cover: "/covers/hermit_crabs-cover.png",
			about: "",
			country: "",
			city: "",
			phoneNumber: "",
			zoomApp: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		//@ send reset password mail
		sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

		//! проверить испортив SENDGRID_API_KEY
		await sendgridMail
			.send(newUserMail({ name: name, lastName: lastName, email: email }))
			.then(() => {
				console.log("new user email sent");
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});

		res.status(201).json(result);

		await client.close();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Пользователь не был создан" });
	}
}

export default handler;
