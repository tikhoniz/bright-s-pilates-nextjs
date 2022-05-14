import {
	connectDatabase,
	getDocuments,
	insertDocument,
} from "../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	//* Создаем тренировку
	if (req.method === "POST") {
		const newWorkout = {
			title: "Sample name",
			video: "sample",
			duration: "0:00",
			coach: "Diana",
			level: "beginer",
			category: "pilates",
			accent: "fullbody",
			props: false,
			comments: [],
			numComments: 0,
			preamble: "Sample preamble",
			description: "Sample description",
			subscription: false,
			creator: req.body.user,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		try {
			const result = await insertDocument(client, "workouts", newWorkout); // записываем новый  id в newComment что  бы вывести в ответе
			res
				.status(201)
				.json({ message: "Workout created!", workoutId: result.insertedId });
		} catch (error) {
			res.status(500).json({ message: "Inserting data failed!" });
		}
	}

	//* Получаем все тренировки
	if (req.method === "GET") {
		try {
			const documents = await getDocuments(client, "workouts", {
				_id: -1, //отсортирует сначала новые
			});

			res.status(200).json({ workouts: documents });
		} catch (error) {
			res.status(500).json({ message: "Getting workouts failed" });
		}
	}

	// close connect to database
	client.close();
}

export default handler;
