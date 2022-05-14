import {
	TPlankIcon,
	TeaserIcon,
	HundredIcon,
	ScissorsIcon,
	TableTopIcon,
	HipTwistIcon,
} from "../components/icons/pilates-poses";

const plans = {
	group: {
		0: {
			id: "one-group",
			description: "1 тренировка",
			type: "group",
			icon: <TableTopIcon />,
			regularPrice: "15",
			discount: "50%",
			discountPrice: "7.5",
			caption: "скидка 50%",
			//stripePriceId: "price_1KWrJsDEPLUFmBILFHTJAlgo", // режим production
			stripePriceId: "price_1KUBR2DEPLUFmBILTkBqjFzb", // проверка оплаты Stripe в режиме development
			qty: "1",
			lists: [
				{ text: "Длительность 60 минут", isAvailable: true },
				//{ text: "Срок действия 1 месяц", isAvailable: true },
				{ text: "Стоимость тренировки $7.5", isAvailable: true },
			],
			labelAction: "Выбрать",
		},
		1: {
			id: "five-group",
			description: "5 тренировок",
			type: "group",
			icon: <HundredIcon />,
			regularPrice: "60",
			discountPrice: "30",
			stripePriceId: "price_1KWrN4DEPLUFmBILNAtzl4iW",
			qty: "5",
			discount: "50%",
			save: "$15",
			caption: "скидка 50%",
			lists: [
				{ text: "Длительность 60 минут", isAvailable: true },
				//{ text: "Срок действия 3 месяца", isAvailable: true },
				{ text: "Стоимость тренировки $6", isAvailable: true },
			],
			labelAction: "Выбрать",
		},
		2: {
			id: "ten-group",
			description: "10 тренировок",
			type: "group",
			icon: <HipTwistIcon />,
			regularPrice: "100",
			discountPrice: "50",
			stripePriceId: "price_1KWrM7DEPLUFmBIL1pPAiBKY",
			qty: "10",
			discount: "50%",
			save: "$50",
			caption: "скидка 50%",
			lists: [
				{ text: "Длительность 60 минут", isAvailable: true },
				//{ text: "Срок действия 6 месяцев", isAvailable: true },
				{ text: "Стоимость тренировки $5", isAvailable: true },
			],
			labelAction: "Выбрать",
		},
	},
	personal: {
		0: {
			id: "one-personal",
			description: "1 тренировка",
			type: "personal",
			icon: <TeaserIcon />,
			regularPrice: "100",
			stripePriceId: "price_1KWrSWDEPLUFmBILHQkufRFo",
			qty: "1",
			caption: "",
			lists: [
				{ text: "Длительность 80 минут", isAvailable: true },
				//{ text: "Срок действия 1 месяц", isAvailable: true },
				{ text: "Стоимость тренировки $100", isAvailable: true },
			],
			labelAction: "Выбрать",
		},
		1: {
			id: "five-personal",
			description: "5 тренировок",
			type: "personal",
			icon: <TPlankIcon />,
			regularPrice: "450",
			stripePriceId: "price_1KWrScDEPLUFmBILU0UhujYK",
			qty: " 5",
			save: "$50",
			caption: "",
			lists: [
				{ text: "Длительность 80 минут", isAvailable: true },
				//{ text: "Срок действия 3 месяца", isAvailable: true },
				{ text: "Стоимость тренировки $90", isAvailable: true },
			],
			labelAction: "Выбрать",
		},
		2: {
			id: "ten-personal",
			description: "10 тренировок",
			type: "personal",
			icon: <ScissorsIcon />,

			regularPrice: "800",
			stripePriceId: "price_1KWrSgDEPLUFmBILsXQYX45B",
			qty: "10",
			save: "$200",
			caption: "",
			lists: [
				{ text: "Длительность 80 минут", isAvailable: true },
				//{ text: "Срок действия 6 месяцев", isAvailable: true },
				{ text: "Стоимость тренировки $80", isAvailable: true },
			],
			labelAction: "Выбрать",
		},
	},
};

export default plans;
