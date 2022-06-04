import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
	const client = await MongoClient.connect(
		`mongodb://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOSTNAME}:${process.env.mongodb_port}/${process.env.MONGO_DB_BASE_NAME}?authSource=admin`, // delete 'n' for to make mistake
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
		}
	);

	return client;
}

// Записывает документ в базу
export async function insertDocument(client, collection, document) {
	const db = client.db();

	const result = await db.collection(collection).insertOne(document);

	return result;
}

// Фильтрует докумены
export async function getFilteredDocuments(client, collection, filter, sort) {
	const db = client.db();
	//получаем всю коллекцию из базы данных
	const documents = await db
		.collection(collection)
		.find(filter) // фильтрует
		.sort(sort) //отсортирует
		.toArray();
	//.easy(); расскоментировать для ошибки

	return documents;
}

// Получает документы из базы
export async function getDocuments(client, collection, sort) {
	const db = client.db();

	const documents = await db
		.collection(collection)
		.find({})
		.sort(sort)
		.toArray();
	//.easy(); расскоментировать для ошибки

	//console.log("Получить коллекцию постов", documents);
	return documents;
}

// Получает документ из базы по ID
export async function getDocument(client, collection, id) {
	const db = client.db();

	// оборачиваем входящий id в объект mongoDB
	const documentId = ObjectId(id);

	//получаем
	const document = await db.collection(collection).findOne({ _id: documentId });

	return document;
}

// Получает пользователя из базы по email
export async function getUserByEmail(client, collection, email) {
	const db = client.db();
	//получаем
	const user = await db.collection(collection).findOne({ email: email });

	return user;
}

// Получает документы по массиву ключей
export async function getDocumentsFromArray(client, collection, arr) {
	const db = client.db();
	//получаем
	const array = await db
		.collection(collection)
		.find({ _id: { $in: arr } })
		.toArray();

	return array;
}

// Получает пользователя из базы по TOKEN
export async function getUserByToken(client, collection, token) {
	const db = client.db();

	const user = await db.collection(collection).findOne({
		resetToken: token,
		resetTokenExp: { $gt: Date.now() },
	});

	return user;
}

// Удаляет документ из базы по ID
export async function deleteDocument(client, collection, id) {
	const db = client.db();
	// оборачиваем входящий id в объект mongoDB
	const documentId = ObjectId(id);
	//получаем
	const result = await db.collection(collection).deleteOne({ _id: documentId });

	return result;
}

// Изменяет документ из базы по ID
export async function updateDocument(client, collection, id, updatedDocument) {
	const db = client.db();
	// оборачиваем входящий id в объект mongoDB
	const documentId = ObjectId(id);

	//получаем
	const result = await db
		.collection(collection)
		.replaceOne({ _id: documentId }, updatedDocument);

	return result;
}

//* USER *//

export async function getUserClasses(client, arr) {
	const db = client.db();
	//получаем
	const array = await db
		.collection("groups")
		.find(
			{ _id: { $in: arr } },
			{
				projection: {
					invitationLink: 0,
					conferenceId: 0,
					accessCode: 0,
					creator: 0,
					createdAt: 0,
					updatedAt: 0,
				},
			}
		)
		.toArray();

	return array;
}

//* SCHEDULE *//
// получает список будущих классов без определенных полей
export async function getGroupClasses(client, collection) {
	// Получает список предстоящих групповых классов
	// время начала которых не позже текущего времени
	// минус [ delay_to_remove_from_schedule ]
	const delay = process.env.delay_to_remove_from_schedule;
	const t = new Date(new Date().getTime() - delay * 60 * 1000).toISOString();

	const db = client.db();
	//получаем всю коллекцию из базы данных
	const documents = await db
		.collection(collection)
		.find(
			{
				startTime: {
					$gte: t,
				},
			},
			{
				projection: {
					invitationLink: 0,
					conferenceId: 0,
					accessCode: 0,
					creator: 0,
					createdAt: 0,
					updatedAt: 0,
					//participants: 0,
				},
			}
		)
		.sort({ startTime: 1 }) // отсортирует сначала ближайшие к началу
		.toArray();

	return documents;
}

//* BLOG *//

// Получает все посты блога без содержания и комментариев
export async function getPost(client, collection, id) {
	const db = client.db();

	// оборачиваем входящий id в объект mongoDB
	const documentId = ObjectId(id);

	//получаем
	const document = await db
		.collection(collection)
		.findOne(
			{ _id: documentId },
			{ projection: { comments: { email: 0, replyComment: { email: 0 } } } }
		);

	return document;
}
// Получает все посты блога без содержания и комментариев
export async function getAllBlogPosts(client, collection, sort) {
	const db = client.db();

	const documents = await db
		.collection(collection)
		.find({ publish: true }, { projection: { body: 0, comments: 0 } })
		.sort(sort)
		.toArray();
	//.easy(); расскоментировать для ошибки
	return documents;
}

// добавляет новый коммент в массив комментариев
export async function addBlogPostComment(client, collection, postId, newItem) {
	const db = client.db();

	// оборачиваем входящий id в объект mongoDB
	const documentId = ObjectId(postId);

	const { result } = await db
		.collection(collection)
		.updateOne({ _id: documentId }, { $push: { comments: { ...newItem } } });
	//.easy(); расскоментировать для ошибки;
	return result;
}

// добавляет новый ответ на комментарий
export async function replayComment(
	client,
	collection,
	postId,
	commentId,
	newAnswer
) {
	const db = client.db();

	// оборачиваем входящий id в объект mongoDB
	const documentId = ObjectId(postId);

	const { result } = await db.collection(collection).updateOne(
		{
			_id: documentId,
			"comments.id": commentId,
		},
		{ $push: { "comments.$.replyComment": { ...newAnswer } } }
	);

	return result;
}
