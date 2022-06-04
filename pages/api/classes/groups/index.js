import { connectDatabase, getGroupClasses } from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	// Получает классы для расписания
	try {
		const classes = await getGroupClasses(client, "groups");

		res.status(200).json(classes);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
	client.close();
}

export default handler;
