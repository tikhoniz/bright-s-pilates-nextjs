// material
import { TableRow, TableCell, TableHead } from "@mui/material";

export default function Head() {
	return (
		<TableHead>
			<TableRow>
				<TableCell sx={{ minWidth: 100 }}></TableCell>
				<TableCell sx={{ minWidth: 100 }}>Начало</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Название</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Уровень</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Длительность</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Тренер</TableCell>
				{/*{user && <TableCell sx={{ minWidth: 100 }}>Запись</TableCell>}*/}
				<TableCell />
			</TableRow>
		</TableHead>
	);
}
