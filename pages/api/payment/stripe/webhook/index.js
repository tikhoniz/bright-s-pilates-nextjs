import Stripe from "stripe";
import { buffer } from "micro";
import { createStripePaidOrder } from "../../../../../src/helpers/api/api-payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: "2020-08-27",
});
export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		let event;

		try {
			// 1. Retrieve the event by verifying the signature using the raw body and secret
			const rawBody = await buffer(req);
			const signature = req.headers["stripe-signature"];

			event = stripe.webhooks.constructEvent(
				rawBody.toString(),
				signature,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (error) {
			console.log(`Error message: ${error.message}`);
			res.status(400).send(`Webhook error: ${error.message}`);
			return;
		}
		// Successfully constructed event
		console.log("Successfully constructed event:", event.id);
		// 2. Handle event type
		//    Обработать тип события (здесь бизнес-логику)
		if (event.type === "checkout.session.completed") {
			const {
				data: { object },
			} = event;

			const { metadata, customer_details } = object;

			const paidOrder = {
				userId: metadata.userId,
				orderId: metadata.orderId,
				userName: customer_details.name,
				userEmail: customer_details.email,
				description: metadata.orderDesc,
				type: metadata.orderType,
				qty: metadata.orderQty,
				regularPrice: metadata.orderPrice,
				discount: metadata.orderDiscount || null,
				discountPrice: metadata.orderDiscountPrice || null,
				paymentMethod: "Stripe",
				paymentResult: object,
				createdAt: new Date(),
			};

			const response = await createStripePaidOrder(paidOrder);

			if (!response.ok) {
				res.status(500).json({
					statusCode: 500,
					message:
						"Не удалось записать оплаченный заказ в базу данных" + response,
				});
			}
		}
		// 3. Return a response to acknowledge receipt of the event.
		//    Вернуть ответ, подтверждающий получение события.
		res.json({ received: true });
	} else {
		res.setHeader("Allow", "POST");
		res.status(405).end("Method Not Allowed");
	}
}

//object:  {
//  id: 'cs_test_a1l6Sp9ApEJKHbbTBAnzDdv1t94HNP53hli7WaIZQ3UaGCi95IizKDp9CD',
//  object: 'checkout.session',
//  after_expiration: null,
//  allow_promotion_codes: null,
//  amount_subtotal: 1500,
//  amount_total: 1500,
//  automatic_tax: { enabled: false, status: null },
//  billing_address_collection: null,
//  cancel_url: 'https://2eca-176-232-61-169.ngrok.io/pricing',
//  client_reference_id: null,
//  consent: null,
//  consent_collection: null,
//  currency: 'usd',
//  customer: 'cus_LXUJuhTe5phVAc',
//  customer_creation: 'always',
//  customer_details: {
//    address: {
//      city: null,
//      country: 'TR',
//      line1: null,
//      line2: null,
//      postal_code: null,
//      state: null
//    },
//    email: 'admin@brightspilates.com',
//    name: 'Tim Bright',
//    phone: null,
//    tax_exempt: 'none',
//    tax_ids: []
//  },
//  customer_email: 'admin@brightspilates.com',
//  expires_at: 1650492903,
//  livemode: false,
//  locale: null,
//  metadata: {
//    userId: '625d4ef34046e0163e27d4f0',
//    orderId: 'one-group',
//    orderQty: '1',
//    orderType: 'group',
//    orderPrice: '15',
//    orderDesc: '1 тренировка',
//    paymentMethod: 'Stripe',
//    orderDiscount: '50%',
//    orderDiscountPrice: '7.5'
//  },
//  mode: 'payment',
//  payment_intent: 'pi_3KqPK7DEPLUFmBIL0Ew4sTMI',
//  payment_link: null,
//  payment_method_options: {},
//  payment_method_types: [ 'card' ],
//  payment_status: 'paid',
//  phone_number_collection: { enabled: false },
//  recovered_from: null,
//  setup_intent: null,
//  shipping: null,
//  shipping_address_collection: null,
//  shipping_options: [],
//  shipping_rate: null,
//  status: 'complete',
//  submit_type: null,
//  subscription: null,
//  success_url: 'https://2eca-176-232-61-169.ngrok.io/success/{CHECKOUT_SESSION_ID}',
//  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
//  url: null
//}
