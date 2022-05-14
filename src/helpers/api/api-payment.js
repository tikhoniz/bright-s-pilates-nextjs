//* @desc Create a paid order Stripe
//* @route GET /api/payment/:slug
//* @access Private
export async function createStripePaidOrder(order) {
	const { userId } = order;

	const response = await fetch(
		`${process.env.localhost}/api/payment/${userId}`, // process.env.localhost необходим для оплаты  Stripe

		{
			method: "POST",
			body: JSON.stringify({ order }),
			headers: { "Content-Type": "application/json" },
		}
	)
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
			console.log(error);
			return error;
		});

	return response;
}

//* @desc Create a paid order PayPal
//* @route GET /api/payment/:slug
//* @access Private
export async function createPayPalPaidOrder(order) {
	const { userId } = order;

	const response = await fetch(`/api/payment/${userId}`, {
		method: "POST",
		body: JSON.stringify({ order }),
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
			console.log(error);
			return error;
		});

	return response;
}
