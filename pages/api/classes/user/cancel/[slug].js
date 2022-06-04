import {
	connectDatabase,
	getDocument,
	updateDocument,
} from "../../../../../src/helpers/db";
// utils
import { getCurrentTime, getEventTime } from "../../../../../src/utils/time";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}

	// Удаляет участника из онлайн тренировки
	if (req.method === "PATCH") {
		const userId = req.body.userId;
		const classId = req.query.slug;

		try {
			const user = await getDocument(client, "users", userId);
			const onlineClass = await getDocument(client, "groups", classId);

			const currentTime = getCurrentTime();
			const cancelTimeClassExpired =
				getEventTime(onlineClass.startTime) -
				Number(process.env.delay_cancel_online_class) * 60 * 1000;

			// проверяет наличие в базе данных
			if (!user || !onlineClass) {
				res.status(404).json({ message: "notFound" });
				// close connect to database
				client.close();
				return;
			}

			// проверяет возможность отмены записи на тренировку,
			if (cancelTimeClassExpired <= currentTime) {
				res.status(422).json({
					message: "cancelNotAvailable",
				});
				client.close();
				return;
			}

			//проверка является ли юзер участником
			const participant = user?.groupList?.some(
				(p) => p.toString() === classId
			);

			if (!participant) {
				res.status(404).json({ message: "notParticipant" });
				client.close();
				return;
			}
			// добавляет тренировку если она не бесплатная
			!onlineClass.freeAccess && (user.groups += 1);

			//удаляет ID тренировки из объекта пользователя
			const updateList = user.groupList.filter((g) => g.toString() !== classId);
			user.groupList = updateList;

			// обновляет юзера
			const { result } = await updateDocument(client, "users", user._id, user);

			if (!result.ok) {
				res.status(500).json({ message: "Updated user failed" });
				client.close();
				return;
			}

			res.status(200).json(result);
			return;
		} catch (error) {
			res.status(500).json({ message: "Updated class failed" });
		}
	}
	client.close();
}

export default handler;
