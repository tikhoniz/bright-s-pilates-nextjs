import {
	connectDatabase,
	deleteDocumentById,
	getDocumentById,
	updateDocument,
} from "../../../src/helpers/db";

async function handler(req, res) {
	const workoutId = req.query.slug;

	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	//* Получаем тренировку по ID
	if (req.method === "GET") {
		try {
			const document = await getDocumentById(client, "workouts", workoutId);

			res.status(200).json({ workout: document });
		} catch (error) {
			res.status(500).json({ message: "Getting comments failed" });
		}
	}

	//* Обновление тренировки
	if (req.method === "PATCH") {
		try {
			const document = await getDocumentById(client, "workouts", workoutId);

			if (document && req.body.id === workoutId) {
				document.title = req.body.title;
				document.video = req.body.video;
				document.duration = req.body.duration;
				document.coach = req.body.coach;
				document.level = req.body.level;
				document.category = req.body.category;
				document.accent = req.body.accent;
				document.props = req.body.props;
				document.preamble = req.body.preamble;
				document.description = req.body.description;
				document.subscription = req.body.subscription;
			}

			const { result } = await updateDocument(
				client,
				"workouts",
				workoutId,
				document
			);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json({ message: "Updated workout failed" });
		}
	}

	//* Удаляет тренировку по ID
	if (req.method === "DELETE") {
		try {
			const { result } = await deleteDocumentById(
				client,
				"workouts",
				req.body._id
			);

			res.status(200).json({ message: "deletedWorkout", response: result });
		} catch (error) {
			res.status(500).json({ message: "Deleting workout failed" });
		}
	}

	// close connect to database
	client.close();
}

export default handler;
