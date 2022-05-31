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
				<TableCell>Обложка</TableCell>
				<TableCell>Название</TableCell>
				<TableCell>Описание</TableCell>
				<TableCell>ID YouTube</TableCell>
				<TableCell sx={{ width: 100 }}></TableCell>
				<TableCell sx={{ width: 100 }}></TableCell>
			</TableRow>
		</TableHead>
	);
}
