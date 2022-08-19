// material
import { TableRow, TableCell, TableHead, styled } from "@mui/material";

export default function Head() {
	const TableHeadStyle = styled(TableHead)(({ theme }) => ({
		"&::after": {
			content: '" "',
			display: "block",
			height: "15px",
		},
	}));

	return (
		<TableHeadStyle>
			<TableRow>
				<TableCell sx={{ minWidth: 100 }}></TableCell>
				<TableCell sx={{ minWidth: 100 }}>Начало</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Название</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Уровень</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Длительность</TableCell>
				<TableCell sx={{ minWidth: 100 }}>Тренер</TableCell>
				<TableCell />
			</TableRow>
		</TableHeadStyle>
	);
}
