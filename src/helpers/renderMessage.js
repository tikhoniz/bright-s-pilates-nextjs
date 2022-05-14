// next
import router from "next/router";
// material
import { Box, Button, Stack, Typography } from "@mui/material";
// components
import { MIconButton } from "../components/@material-extend";
//icons
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";

export default function renderMessage(message, action) {
	if (message === "alreadyParticipant") {
		return "Вы уже участник этой тренировки";
	}
	if (message === "notParticipant") {
		return "Вы не участник этой тренировки";
	}
	if (message === "cannotJoin") {
		return "Прошло больше 10 минут с начала тренировки. К сожалению, Вы не можете присоединиться к тренировке.";
	}

	if (message === "registrationNotAvailable") {
		return "Регистрация на тренировку невозможна";
	}
	if (message === "cancelNotAvailable") {
		return "Отмена тренировки недоступна менее чем за 1 час до начала";
	}

	if (message === "noPaidPersonalClasses") {
		return "У Вас нет оплаченных ПЕРСОНАЛЬНЫХ тренировок";
	}
	if (message === "noUser") {
		return "Пользователь не найден";
	}

	if (message === "noPaidGroupClasses") {
		const getOffers = (action) => {
			router.push(`/pricing`);
			action();
		};

		return (
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					alignItems: { xs: "flex-end", sm: "center" },
				}}
			>
				<Typography sx={{ mb: { xs: 1, sm: 0 }, mr: { sm: 1 } }}>
					У Вас нет оплаченных тренировок.
				</Typography>

				<Stack direction="row" spacing={1}>
					<Button
						size="medium"
						variant="outlined"
						sx={{ color: "#ffffff", borderColor: "#ffffff" }}
						onClick={() => getOffers(action)}
					>
						КУПИТЬ
					</Button>
					<MIconButton
						size="medium"
						sx={{ color: "#ffffff" }}
						onClick={() => action()}
					>
						<Icon icon={closeFill} />
					</MIconButton>
				</Stack>
			</Box>
		);
	}

	return message;
}
