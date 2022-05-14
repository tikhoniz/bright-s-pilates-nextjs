import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
//import { Link as RouterLink } from 'react-router-dom';
import checkmarkFill from "@iconify/icons-eva/checkmark-fill";
// material
import { styled } from "@mui/material/styles";
import { Card, Button, Typography, Box, Stack } from "@mui/material";

import Label from "../Label";
import { Link as ScrollLink } from "react-scroll";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
	maxWidth: 380,
	margin: "auto",
	display: "flex",
	position: "relative",
	alignItems: "center",
	flexDirection: "column",
	padding: theme.spacing(5),
	paddingTop: 50,
	boxShadow: "none",
	border: " solid 1px rgba(145, 158, 171, 0.32)",
	"&:hover": {
		boxShadow: theme.customShadows.z8,
	},
	cursor: "pointer",
	[theme.breakpoints.down(1024)]: {
		padding: "50px 20px",
	},
	[theme.breakpoints.down(900)]: {
		//padding: theme.spacing(5),
		padding: "50px 40px",
	},
}));

// ----------------------------------------------------------------------

PricingCard.propTypes = {
	index: PropTypes.number,
	card: PropTypes.object,
};

export default function PricingCard({ card, placeOrderHandler }) {
	const {
		id,
		icon,
		save,
		type,
		description,
		regularPrice,
		lists,
		caption,
		discount,
		labelAction,
		discountPrice,
	} = card;

	return (
		<RootStyle>
			{save && (
				<Label
					color="info"
					sx={{
						top: 16,
						right: 16,
						position: "absolute",
						color: "#229a16",
						backgroundColor: "rgba(84, 214, 44, 0.16)",
					}}
				>
					ЭКОНОМИЯ {save}
				</Label>
			)}

			<Typography variant="overline" sx={{ color: "text.secondary" }}>
				{description}&nbsp;
				{type === "group" ? "в группе" : "персонально"}
			</Typography>

			<Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
				<Typography variant="subtitle1">$</Typography>

				{discount ? (
					<>
						<Typography
							gutterBottom
							component="span"
							variant="h3"
							sx={{
								alignSelf: "flex-start",
								color: "text.secondary",
								textDecoration: "line-through",
							}}
						>
							{regularPrice}
						</Typography>
						<Typography variant="h2" sx={{ mx: 1 }}>
							{discountPrice}
						</Typography>
					</>
				) : (
					<Typography variant="h2" sx={{ mx: 1 }}>
						{regularPrice}
					</Typography>
				)}
			</Box>

			<Typography
				variant="subtitle1"
				sx={{
					color: "#B78103",
					textTransform: "capitalize",
					minHeight: 28,
				}}
			>
				{caption}
			</Typography>

			<Box display="flex" sx={{ width: 100, height: 100, mt: 3 }}>
				{icon}
			</Box>

			<Stack component="ul" spacing={2} sx={{ my: 5 }}>
				{lists.map((item) => (
					<Stack
						key={item.text}
						component="li"
						direction="row"
						alignItems="center"
						spacing={1.5}
						sx={{
							typography: "body2",
							color: item.isAvailable ? "text.primary" : "text.disabled",
							whiteSpace: "nowrap",
						}}
					>
						<Box
							component={Icon}
							icon={checkmarkFill}
							sx={{ width: 20, height: 20 }}
						/>
						<Typography variant="body2">{item.text}</Typography>
					</Stack>
				))}
			</Stack>

			<ScrollLink to="move_top" style={{ width: "100%", maxWidth: 260 }}>
				<Button
					fullWidth
					size="large"
					//variant="outlined"
					variant="contained"
					onClick={() => placeOrderHandler(card)}
				>
					{labelAction}
				</Button>
			</ScrollLink>
		</RootStyle>
	);
}
