import {
	connectDatabase,
	getDocumentById,
	updateDocument,
} from "../../../../src/helpers/db";
// utils
import { getCurrentTime, getEventTime } from "../../../../src/utils/time";

async function handler(req, res) {
	let client;

	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}
	// Добавляет участника в онлайн тренировку
	if (req.method === "PATCH") {
		const userId = req.body.userId;
		const classId = req.query.slug;

		try {
			const user = await getDocumentById(client, "users", userId);
			const onlineClass = await getDocumentById(client, "groups", classId);

			const currentTime = getCurrentTime();
			const signupTimeClassExpired =
				getEventTime(onlineClass.startTime) +
				Number(process.env.delay_signup_online_class) * 60 * 1000;

			// проверяет наличие в базе данных
			if (!user || !onlineClass) {
				res.status(404).json({ message: "notFound" });
				// close connect to database
				client.close();
				return;
			}

			// проверяет возможность записи на тренировку,
			if (signupTimeClassExpired < currentTime) {
				res.status(422).json({ message: "registrationNotAvailable" });
				client.close();
				return;
			}

			//проверяет является ли юзер участником
			const participant = user?.groupList?.some(
				(p) => p.toString() === classId
			);

			if (participant) {
				res.status(422).json({ message: "alreadyParticipant" });
				client.close();
				return;
			}
			// проверяет оплаченные тренировки, если тренировка платная
			if (!onlineClass.freeAccess) {
				if (user.groups <= 0) {
					res.status(422).json({ message: "noPaidGroupClasses" });
					client.close();
					return;
				}
				user.groups > 0 && (user.groups -= 1);
			}

			// добавляет ID тренировки в объект пользователя
			user.groupList = [...user.groupList, onlineClass._id];

			// обновляет юзера
			const { result } = await updateDocument(client, "users", user._id, user);

			if (!result.ok) {
				res.status(500).json({ message: "Updated user failed" });
				client.close();
				return;
			}

			res.status(200).json(result);
			client.close();
			return;
		} catch (error) {
			res.status(500).json({ message: "Updated class failed" });
		}
	}
	client.close();
}

export default handler;
