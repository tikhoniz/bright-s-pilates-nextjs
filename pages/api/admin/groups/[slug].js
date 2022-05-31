import { getSession } from "next-auth/react";
import {
	connectDatabase,
	deleteDocument,
	getDocument,
	updateDocument,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	const session = await getSession({ req });
	const classId = req.query.slug;

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

	// Обновляет онлайн класс по ID
	if (req.method === "PATCH") {
		try {
			const document = await getDocument(client, "groups", classId);
			// приведение id mongo  к строке
			if (document._id.toString() === classId) {
				document.title = req.body.title || document.title;
				document.invitationLink =
					req.body.invitationLink || document.invitationLink;
				document.conferenceId = req.body.conferenceId || document.conferenceId;
				document.accessCode = req.body.accessCode || document.accessCode;
				document.duration = req.body.duration || document.duration;
				document.level = req.body.level || document.level;
				document.coach = req.body.coach || document.coach;
				document.freeAccess = req.body.freeAccess;
				document.startTime = req.body.startTime || document.startTime;
				document.updatedAt = new Date();
			}

			const result = await updateDocument(client, "groups", classId, document);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Updated class failed" });
		}
	}

	// Удаляет онлайн класс по ID
	if (req.method === "DELETE") {
		try {
			const { result } = await deleteDocument(client, "groups", classId);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Deleting class failed" });
		}
	}
	// close connect to database
	client.close();
}

export default handler;
