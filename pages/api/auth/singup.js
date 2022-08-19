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

	const { name, email, password, image, provider } = req.body;

	// легкая валидация на уровне сервера
	if (!email || !email.includes("@")) {
		res.status(422).json({ message: "Еmail должен содержать @" });
		return;
	}

	//if (regType === "Credentials" && (!password || password.trim().length < 5)) {
	//	res.status(422).json({ message: "Длина пароля не менее 5 знаков" });
	//	return;
	//}

	const credentials = provider === "credentials";

	const newUser = {
		name: name,
		email: email,
		personals: 0,
		groups: 0,
		personalList: [],
		groupList: [],
		image: image,
		imageId: null,
		cover: "/covers/hermit_crabs-cover.png",
		about: "",
		country: "",
		city: "",
		phoneNumber: "",
		zoomApp: false,
		provider: provider,
		createdAt: new Date(),
		emailVerified: null,
	};

	try {
		const client = await connectDatabase();

		if (credentials) {
			//проверка уникальности email
			const existingUser = await getUserByEmail(client, "users", email);

			if (existingUser) {
				res.status(422).json({ message: "Этот email уже зарегистрирован" });
				client.close();
				return;
			}

			// хеширование пароля
			const hashedPassword = await hashPassword(password);
			newUser.password = hashedPassword;
			newUser.image = "/images";
		}

		const result = await insertDocument(client, "users", newUser);

		//@ send reset password mail
		sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

		//! проверить испортив SENDGRID_API_KEY
		await sendgridMail
			.send(newUserMail({ name: name, email: email }))
			.then(() => {
				console.log("new user email sent");
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
			});

		res.status(201).json(result);

		client.close();
		return;
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Пользователь не был создан" });
	}
}

export default handler;
