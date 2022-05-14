import { connectDatabase, getDocuments } from "../../../src/helpers/db";

async function handler(req, res) {
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: "Connected to the database failed" });
		return;
	}
	//*************************************************************/
	//**************** --------------------------- ****************/
	//*************************************************************/
	//if (req.method === "GET") {
	//	try {
	//		const documents = await getDocuments(client, "users", {
	//			_id: -1, //отсортирует сначала новые
	//		});

	//		res.status(200).json({ users: documents, ok: 1 });
	//	} catch (error) {
	//		res.status(500).json({ message: "Getting messages failed" });
	//	}
	//}
	// close connect to database
	client.close();
}

export default handler;
