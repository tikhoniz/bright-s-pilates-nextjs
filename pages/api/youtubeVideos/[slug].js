import {
	connectDatabase,
	deleteDocument,
	getDocument,
	updateDocument,
} from "../../../src/helpers/db";
import useAdmin from "../../../src/hooks/useAdmin";

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

	const videoId = req.query.slug;

	// Удаляет онлайн видео по ID
	if (req.method === "DELETE") {
		try {
			const { result } = await deleteDocument(client, "youtubeVideos", videoId);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Deleting class failed" });
		}
	}

	// Обновляет видео по ID
	if (req.method === "PATCH") {
		try {
			const document = await getDocument(client, "youtubeVideos", videoId);
			document.title = req.body.title;
			document.cover = req.body.cover;
			document.youtubeId = req.body.youtubeId;
			document.description = req.body.description;
			document.updatedAt = new Date();

			const result = await updateDocument(
				client,
				"youtubeVideos",
				videoId,
				document
			);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Updated class failed" });
		}
	}

	client.close();
}

export default handler;
