import { connectDatabase, getPost } from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		client.close();
		return;
	}

	// Получает пост по ID
	if (req.method === "GET") {
		try {
			const postId = req.query.slug;
			const post = await getPost(client, "posts", postId);

			if (!post) {
				client.close();
				res.status(500).json({ message: "noPost" });
				return;
			}
			res.status(200).json(post);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	client.close();
}

export default handler;
