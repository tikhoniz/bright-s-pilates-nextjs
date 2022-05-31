import { getSession } from "next-auth/react";
import {
	connectDatabase,
	getDocuments,
	getScheduleClasses,
	insertDocument,
} from "../../../src/helpers/db";
import useAdmin from "../../../src/hooks/useAdmin";

async function handler(req, res) {
	const isAdmin = await useAdmin(req);

	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	//  Получает список всех видео
	if (req.method === "GET") {
		try {
			const documents = await getDocuments(client, "youtubeVideos", {
				startTime: 1, //отсортирует сначала ближайшие к началу
			});
			//res.status(200).json({ groupClasses: documents, ok: 1 });
			res.status(200).json(documents);
		} catch (error) {
			res.status(500).json({ message: error.message });
			return;
		}
	}

	// Создает новое видео
	if (req.method === "POST") {
		if (!isAdmin) {
			res.status(500).json("Access is denied");
			return;
		}

		const { title, youtubeId, description, cover } = req.body;

		const currentDate = new Date();

		const newVideo = {
			cover,
			title,
			youtubeId,
			description,
			createdAt: currentDate,
			updatedAt: currentDate,
		};

		try {
			const result = await insertDocument(client, "youtubeVideos", newVideo); // записываем новый  id в newComment что  бы вывести в ответе
			res.status(201).json(result);
		} catch (error) {
			res.status(500).json({ message: "Inserting data failed!" });
		}
	}

	client.close();
}

export default handler;
