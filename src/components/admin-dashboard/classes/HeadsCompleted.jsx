// material
import { TableRow, TableCell, TableHead } from "@mui/material";
//icons
import { Icon } from "@iconify/react";
import OutlineTimer from "@iconify/icons-ic/outline-timer";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";

export default function HeadsCompleted() {
	return (
		<TableHead>
			<TableRow>
				<TableCell sx={{ minWidth: 65 }}></TableCell>
				<TableCell>Дата</TableCell>
				<TableCell>Тип</TableCell>
				<TableCell>Уровень</TableCell>
				<TableCell>Название</TableCell>
				<TableCell>Тренер</TableCell>
				<TableCell>
					<Icon icon={BaselineGroups} width={30} height={30} />
				</TableCell>
				<TableCell>
					<Icon icon={OutlineTimer} width={30} height={30} />
				</TableCell>
			</TableRow>
		</TableHead>
	);
}
