import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27",
});

async function handler(req, res) {
	if (req.method === "POST") {
		const {
			id,
			qty,
			type,
			regularPrice,
			discount,
			description,
			discountPrice,
		} = req?.body?.order ?? {};

		const { _id, email } = req?.body?.user ?? {};

		try {
			const session = await stripe.checkout.sessions.create({
				mode: "payment",
				customer_email: email ?? "test@test.com",
				payment_method_types: ["card"],
				line_items: req?.body?.items ?? [],
				metadata: {
					userId: _id,
					orderId: id,
					orderQty: qty,
					orderType: type,
					orderPrice: regularPrice,
					orderDesc: description,
					paymentMethod: "Stripe",
					orderDiscount: discount,
					orderDiscountPrice: discountPrice,
				},
				success_url: `${req.headers.origin}/success/{CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/pricing`,
			});

			res.status(200).json(session);
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}

export default handler;
