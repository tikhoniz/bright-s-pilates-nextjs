import { getSession } from "next-auth/react";
import {
	getDocuments,
	connectDatabase,
	insertDocument,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	const session = await getSession({ req });

	const isAdmin =
		session?.user.email === process.env.admin ||
		session?.user.email === process.env.dev;

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

	//  Получает список всех групповых классов
	if (req.method === "GET") {
		try {
			const documents = await getDocuments(client, "groups", {
				startTime: 1, //отсортирует сначала ближайшие к началу
			});
			//res.status(200).json({ groupClasses: documents, ok: 1 });
			res.status(200).json(documents);
		} catch (error) {
			res.status(500).json({ message: error.message });
			return;
		}
	}

	// Создает новый групповой класс
	if (req.method === "POST") {
		const currentDate = new Date();

		const newClass = {
			title: "Sample name",
			invitationLink: "add_URL",
			conferenceId: "00000000",
			accessCode: "0000",
			duration: "60",
			type: "group",
			level: "beginer",
			freeAccess: false,
			coach: "Диана",
			avatar: "/images/diana-coach-photo.jpg",
			urlCoach: "/coaches/diana-head-coach",
			startTime: currentDate,
			creator: req.body.userEmail,
			participants: [],
			createdAt: currentDate,
			updatedAt: currentDate,
		};

		try {
			const result = await insertDocument(client, "groups", newClass); // записываем новый  id в newComment что  бы вывести в ответе
			res.status(201).json(result);
		} catch (error) {
			res.status(500).json({ message: "Inserting data failed!" });
		}
	}

	// close connect to database
	client.close();
}

export default handler;
