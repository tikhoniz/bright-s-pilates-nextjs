import { TableRow, TableCell, Typography } from "@mui/material";

export default function NoClasses() {
	return (
		<TableRow>
			<TableCell align="center" colSpan={"100%"}>
				<Typography
					variant="overline"
					sx={{
						mb: 1,
						display: "block",
						color: "text.secondary",
					}}
				>
					В настоящий момент нет запланированных классов
				</Typography>
			</TableCell>
		</TableRow>
	);
}
