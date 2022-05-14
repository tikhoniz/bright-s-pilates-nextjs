// material
import { TableRow, TableCell, TableHead } from "@mui/material";
//icons
import { Icon } from "@iconify/react";
import OutlineTimer from "@iconify/icons-ic/outline-timer";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";
import MHidden from "../../@material-extend/MHidden";

export default function Heads() {
	return (
		<TableHead>
			<TableRow>
				<MHidden width="smDown">
					<TableCell sx={{ minWidth: 100 }}></TableCell>
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
					<TableCell>Ссылка</TableCell>
					<TableCell>ID класса</TableCell>
					<TableCell>Код доступа</TableCell>
				</MHidden>

				<MHidden width="smUp">
					<TableCell>Дата</TableCell>
					<TableCell>
						<Icon icon={BaselineGroups} width={30} height={30} />
					</TableCell>
					<TableCell>
						<Icon icon={OutlineTimer} width={30} height={30} />
					</TableCell>
				</MHidden>

				<TableCell />
				<TableCell />
			</TableRow>
		</TableHead>
	);
}
