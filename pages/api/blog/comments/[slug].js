import {
	addBlogPostComment,
	connectDatabase,
	replayComment,
} from "../../../../src/helpers/db";

import { v4 as uuidv4 } from "uuid";
import { replayPostComment } from "../../../../src/helpers/api/api-blog";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		client.close();
		return;
	}

	if (req.method === "PUT") {
		try {
			const postId = req.query.slug;
			const { comment } = req.body;

			const result = await addBlogPostComment(client, "posts", postId, comment);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "addCommentFailed" });
		}
	}

	if (req.method === "PATCH") {
		try {
			const postId = req.query.slug;
			const { newAnswer, commentId } = req.body;

			const result = await replayComment(
				client,
				"posts",
				postId,
				commentId,
				newAnswer
			);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "replayCommentFailed" });
		}
	}

	client.close();
}

export default handler;
