import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	console.log("получает id заказа из success.jsx"); //! delete for production
	// получает id заказа из success.jsx
	if (req.method === "GET") {
		const id = req.query.id;
		try {
			if (!id.startsWith("cs_")) {
				throw Error("Incorrect CheckoutSession ID.");
			}
			// возвращает оплаченный звказ
			const checkout_session = await stripe.checkout.sessions.retrieve(id);
			res.status(200).json(checkout_session);
		} catch (err) {
			res.status(500).json({ statusCode: 500, message: err.message });
		}
	}
}

/*checkout_session {
  id: 'cs_test_a1jgHAUdn15pcFKqCPMe6crYUu58Ra2Q2VQSSDwmyCyj1Kd7TgUgv7EvdX',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 1500,
  amount_total: 1500,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3001/pricing',
  client_reference_id: null,
  consent: null,
  consent_collection: null,
  currency: 'usd',
  customer: 'cus_LBEJZAPG4GP2el',
  customer_creation: 'always',
  customer_details: {
    email: 'admin@brightspilates.com',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: 'admin@brightspilates.com',
  expires_at: 1645359306,
  livemode: false,
  locale: null,
  metadata: {
    userId: '61f2a9011679bd843dfc908c',
    orderId: 'one-group',
    orderPrice: '15',
    orderDesc: '1 тренировка',
    orderType: 'group',
    orderQty: '1',
    paymentMethod: 'Stripe'
  },
  mode: 'payment',
  payment_intent: 'pi_3KUrqBDEPLUFmBIL18B5YPjL',
  payment_link: null,
  payment_method_options: {},
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping: null,
  shipping_address_collection: null,
  shipping_options: [],
  shipping_rate: null,
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3001/success?session_id={CHECKOUT_SESSION_ID}',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  url: null
}*/
