import {
	connectDatabase,
	getFilteredDocuments,
} from "../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}
	// Получает список предстоящих групповых классов
	// время начала которых не позже текущего времени
	// минус [ delay_to_remove_from_schedule ]
	const delay = process.env.delay_to_remove_from_schedule;
	const t = new Date(new Date().getTime() - delay * 60 * 1000).toISOString();

	try {
		const upcomingGroups = await getFilteredDocuments(
			client,
			"groups",
			{
				startTime: {
					$gte: t,
				},
			},
			{
				startTime: 1, //отсортирует сначала ближайшие к началу
			}
		);

		upcomingGroups.forEach((it) => {
			delete it.invitationLink;
			delete it.conferenceId;
			delete it.accessCode;
			delete it.creator;
			delete it.createdAt;
			delete it.updatedAt;
			delete it.participants;
		});

		//console.log(
		//	"[api/classes/groups]: Получает список предстоящих групповых классов каждые 30 секунд"
		//); //! delete for production
		res.status(200).json(upcomingGroups);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
	client.close();
}

export default handler;
