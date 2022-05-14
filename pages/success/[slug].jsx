import React, { useEffect } from "react";
import { styled } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Page from "../../src/components/Page";
import CheckoutOrderComplete from "../../src/components/payment/CheckoutOrderComplete";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../src/utils/fetcher";
import { useSWRConfig } from "swr";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	display: "flex",
	minHeight: "100%",
	alignItems: "center",
	paddingTop: theme.spacing(20),
	paddingBottom: theme.spacing(25),
}));

// ----------------------------------------------------------------------

const Success = () => {
	const router = useRouter();

	const { data: session } = useSession();
	const { mutate } = useSWRConfig();

	const { user } = session ?? {};

	const orderId = router.query.slug;

	useEffect(() => {
		// change cash
		mutate(`/api/users/${user?.email}`);
	}, []);

	let paidOrder = {};
	let url = null;

	if (orderId?.startsWith("payPal_")) {
		const id = orderId?.split("_")[1];
		url = `/api/orders/${id}`;
	}

	if (orderId?.startsWith("cs_")) {
		url = `/api/payment/stripe/${orderId}`;
	}

	// пометить ресурс как неизменный, отработает один раз
	const { data, error } = useSWRImmutable(url, fetcher);

	if (data && data?.paymentMethod === "PayPal") {
		paidOrder = {
			order: data.description,
			type: data.type,
			price: data.regularPrice,
			discountPrice: data.discountPrice,
		};
	}

	if (data && data?.metadata?.paymentMethod === "Stripe") {
		paidOrder = {
			order: data.metadata.orderDesc,
			type: data.metadata.orderType,
			price: data.metadata.orderPrice,
			discountPrice: data.metadata.orderDiscountPrice,
		};
	}

	return (
		<RootStyle
			title={
				`${error ? "Ошибка оплаты" : "Успешная оплата"}` + " | Bright's Pilates"
			}
		>
			<CheckoutOrderComplete router={router} data={paidOrder} error={error} />;
		</RootStyle>
	);
};

export default Success;
