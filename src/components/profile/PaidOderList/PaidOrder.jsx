// material
import { TableRow, TableCell, Typography } from "@mui/material";
import { dayMonthYearDate } from "../../../utils/time";

const PaidOrder = ({ order }) => {
	const {
		createdAt,
		description,
		type,
		regularPrice,
		discountPrice,
		paymentMethod,
	} = order;

	return (
		<TableRow>
			<TableCell sx={{ height: "98px" }}>
				<time dateTime={createdAt}>{dayMonthYearDate(createdAt, "ru-RU")}</time>
			</TableCell>

			<TableCell>
				<Typography variant="body2">{description}</Typography>
				<Typography variant="body2">
					{type === "group" ? "в группе" : "персонально"}
				</Typography>
			</TableCell>

			<TableCell>
				<Typography variant="body2">
					{discountPrice ? discountPrice : regularPrice}
				</Typography>
			</TableCell>

			<TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
				<Typography variant="subtitle1">{paymentMethod}</Typography>
			</TableCell>
		</TableRow>
	);
};

export default PaidOrder;
