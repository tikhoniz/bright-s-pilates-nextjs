import {
	connectDatabase,
	getUserByEmail,
	getUserClasses,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({
			message: "Connected to the database failed [/api/classes/user/[slug]]",
		});
		return;
	}

	// Получает все классы пользователя
	if (req.method === "GET") {
		try {
			const user = await getUserByEmail(client, "users", req.query.slug);

			const classes = await getUserClasses(client, user.groupList);

			res.status(200).json(classes);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
	// close connect to database
	client.close();
}

export default handler;
