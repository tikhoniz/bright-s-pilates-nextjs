import {
	connectDatabase,
	getScheduleClasses,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	try {
		const upcomingGroups = await getScheduleClasses(client, "groups");

		res.status(200).json(upcomingGroups);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
	client.close();
}

export default handler;
