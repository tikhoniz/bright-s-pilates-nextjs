import { Button, Tooltip } from "@mui/material";

const SingupButton = ({ sx, router }) => {
	return (
		<Tooltip
			title={
				"Для записи на тренировку Вам необходимо войти в свой аккаунт или зарегистрироваться"
			}
		>
			<Button
				type="submit"
				variant="outlined"
				sx={{
					backgroundColor: "#fff",
					"&:hover": { backgroundColor: "grey.100" },
					...sx,
				}}
				onClick={() => router.push("/auth")}
			>
				Вход
			</Button>
		</Tooltip>
	);
};

export default SingupButton;
