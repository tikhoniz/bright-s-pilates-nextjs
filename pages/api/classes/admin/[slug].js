import {
	connectDatabase,
	deleteDocument,
	getDocument,
	updateDocument,
} from "../../../../src/helpers/db";
import useAdmin from "../../../../src/hooks/useAdmin";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	const isAdmin = await useAdmin(req);

	if (!isAdmin) {
		res.status(500).json("Access is denied");
		return;
	}

	// Обновляет онлайн класс по ID
	// Admin
	if (req.method === "PATCH") {
		try {
			const document = await getDocument(client, "groups", req.query.slug);
			// приведение id mongo  к строке
			if (document._id.toString() === req.query.slug) {
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

			const result = await updateDocument(
				client,
				"groups",
				req.query.slug,
				document
			);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Updated class failed" });
		}
	}

	// Удаляет онлайн класс по ID
	// Admin
	if (req.method === "DELETE") {
		try {
			const { result } = await deleteDocument(client, "groups", req.query.slug);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Deleting class failed" });
		}
	}
	client.close();
}

export default handler;
