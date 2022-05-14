import {
	connectDatabase,
	getDocumentsFromArray,
	getUserByEmail,
} from "../../../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({
			message:
				"Connected to the database failed [/api/classes/groups/user/[slug]]",
		});
		return;
	}

	// Получает все классы пользователя
	if (req.method === "GET") {
		try {
			const user = await getUserByEmail(client, "users", req.query.slug);

			const userClasses = await getDocumentsFromArray(
				client,
				"groups",
				user.groupList
			);

			userClasses.forEach((it) => {
				delete it.invitationLink;
				delete it.conferenceId;
				delete it.accessCode;
				delete it.creator;
				delete it.createdAt;
				delete it.updatedAt;
				delete it.participants;
			});

			//console.log(
			//	"[api/classes/user/[slug]]: Получает список тренировок пользователя"
			//); //! delete for production

			res.status(200).json(userClasses);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
	// close connect to database
	client.close();
}

export default handler;
