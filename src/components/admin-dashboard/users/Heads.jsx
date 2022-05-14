// material
import { TableRow, TableCell, TableHead } from "@mui/material";
// icons
import { Icon } from "@iconify/react";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";
import BaselinePerson from "@iconify/icons-ic/baseline-person";

export default function Heads() {
	return (
		<TableHead>
			<TableRow>
				<TableCell>Создан</TableCell>
				<TableCell>Последний вход</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Пользователь</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Телефон</TableCell>
				<TableCell>
					<Icon icon={BaselineGroups} width={30} height={30} />
				</TableCell>
				<TableCell>
					<Icon icon={BaselinePerson} width={24} height={24} />
				</TableCell>
				<TableCell>Счета</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Страна</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Город</TableCell>
				<TableCell sx={{ minWidth: 100 }}>О себе</TableCell>
			</TableRow>
		</TableHead>
	);
}
