import {
	connectDatabase,
	getDocuments,
	insertDocument,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	// Создает персональный класс
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
			//participants: [],
			createdAt: currentDate,
			updatedAt: currentDate,
		};

		try {
			const result = await insertDocument(client, "personals", newClass); // записываем новый  id в newComment что  бы вывести в ответе

			res.status(201).json(result);
		} catch (error) {
			res.status(500).json({ message: "Inserting data failed!" });
		}
	}

	// Получает список персональныx классов
	if (req.method === "GET") {
		try {
			const documents = await getDocuments(client, "personals");
			res.status(200).json({ personals: documents, ok: 1 });
		} catch (error) {
			res.status(500).json({ message: "Getting classes failed" });
			return;
		}
	}
	// close connect to database
	client.close();
}

export default handler;
