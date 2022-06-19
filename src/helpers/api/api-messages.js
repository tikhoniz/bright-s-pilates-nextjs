//* @desc Create a user message
//* @route POST /api/messages
//* @access Private
export async function createMessage({
	coach,
	request,
	subject,
	message,
	userName,
	userEmail,
	whatsappNumber,
	telegramAccount,
}) {
	const response = await fetch(`/api/messages`, {
		method: "POST",
		body: JSON.stringify({
			coach,
			subject,
			message,
			request,
			userName,
			userEmail,
			whatsappNumber,
			telegramAccount,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			} else {
				//если ответ не response.ok
				const data = await response.json();
				throw new Error(data.message || "Something went wrong!");
			}
		})
		.catch((error) => {
			return error;
		});

	return response;
}

//* @desc Updated a user message
//* @route PATCH /api/messages/:slug
//* @access Admin
export const updateUserMessage = async ({ messageId, answer }) => {
	const response = await fetch(`/api/messages/${messageId}`, {
		method: "PATCH",
		body: JSON.stringify({ answer }),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(data.message || "Something went wrong!");
		})
		.catch((error) => {
			return error;
		});

	return response;
};
