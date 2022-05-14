import crypto from "crypto";

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
	// Prevent time sync issue between client signature generation and zoom
	const timestamp = Date.now() - 30000;
	const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString(
		"base64"
	);
	const hash = crypto
		.createHmac("sha256", apiSecret)
		.update(msg)
		.digest("base64");
	const signature = Buffer.from(
		`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
	).toString("base64");

	return signature;
}

const handler = (req, res) => {
	if (req.method === "GET") {
		const [meetingNumber, email] = req.query.slug;

		const role = email === process.env.admin ? "1" : "0";

		if (typeof meetingNumber !== "string" || typeof role !== "string")
			return res
				.status(400)
				.send("Please add meetingNumber and role in your query");

		const signature = generateSignature(
			process.env.zoom_api_key,
			process.env.zoom_api_secret,
			meetingNumber,
			parseInt(role)
		);

		return res.status(200).json({ signature });
	}

	return res.status(400).send(`${req.method} Bad request`);
};

export default handler;
