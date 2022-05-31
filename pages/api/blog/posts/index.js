import {
	connectDatabase,
	getAllBlogPosts,
	insertDocument,
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

	//* @desc Fetch all posts
	//* @access Public
	if (req.method === "GET") {
		try {
			const documents = await getAllBlogPosts(client, "posts", {
				_id: -1, //отсортирует сначала новые
			});

			res.status(200).json(documents);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	//* @desc Create a post
	//* @access Private
	if (req.method == "POST") {
		const isAdmin = await useAdmin(req);

		if (!isAdmin) {
			res.status(500).json({ message: "Access is denied" });
			return;
		}

		const {
			tags,
			cover,
			title,
			author,
			content,
			publish,
			comments,
			metaTitle,
			description,
			metaKeywords,
			metaDescription,
		} = req.body;

		try {
			const result = await insertDocument(client, "posts", {
				author,
				body: content,
				comment: 0,
				comments: comments ? [] : false,
				cover: cover,
				createdAt: new Date(),
				description,
				favorite: 0,
				tags,
				title,
				view: 0,
				metaKeywords,
				metaDescription,
				metaTitle,
				publish,
			});

			res.status(201).json(result);
			client.close();
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Пост не был создан" });
		}
	}

	client.close();
}

export default handler;
