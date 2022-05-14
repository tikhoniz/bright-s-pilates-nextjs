// material
import { TableRow, TableCell, TableHead } from "@mui/material";

export default function MessagesHeads() {
	return (
		<TableHead>
			<TableRow>
				<TableCell></TableCell>
				<TableCell>Дата</TableCell>
				<TableCell>Пользователь</TableCell>
				<TableCell>Тема</TableCell>
				<TableCell>Сообщение</TableCell>
				<TableCell>Ответ</TableCell>
			</TableRow>
		</TableHead>
	);
}
