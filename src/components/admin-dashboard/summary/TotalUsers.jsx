// material
import {
	Box,
	Card,
	Stack,
	Radio,
	Typography,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";
import { alpha, useTheme, styled } from "@mui/material";
// utils
import { fNumber, fPercent } from "../../../utils/formatNumber";
import { useState } from "react";
// icons
import { Icon } from "@iconify/react";
import trendingUpFill from "@iconify/icons-eva/trending-up-fill";
import trendingDownFill from "@iconify/icons-eva/trending-down-fill";
import useUserList from "../../../hooks/useUserList";
// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
	width: 24,
	height: 24,
	display: "flex",
	borderRadius: "50%",
	alignItems: "center",
	justifyContent: "center",
	color: theme.palette.success.main,
	backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

const RadioGroupStyle = styled(RadioGroup)(({ theme }) => ({
	//minWidth: 200,
	top: theme.spacing(1),
	right: theme.spacing(1),
	padding: theme.spacing(2),
	backdropFilter: "blur(8px)",
	WebkitBackdropFilter: "blur(8px)", // Fix on Mobile
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.grey[600], 0.72),
}));

// ----------------------------------------------------------------------

const TotalUsers = () => {
	const { users, isLoading, isError } = useUserList();

	const [period, setPeriod] = useState(30);
	const theme = useTheme();

	const currentDate = new Date().getTime();

	const handleChangeSpacing = (event) => {
		setPeriod(Number(event.target.value));
	};

	const quantity = users.reduce((acc, user) => {
		const userCreated = new Date(user.createdAt).getTime();
		const time = period * 24 * 60 * 60 * 1000;

		userCreated > currentDate - time && (acc += 1);

		return acc;
	}, 0);

	const percentIncrease = (quantity * 100) / users?.length;

	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "center",
				p: 3,
				maxWidth: 300,
				margin: "0 auto",
			}}
		>
			<Box sx={{ flexGrow: 1 }}>
				<Typography variant="h4">
					Пользователей: {fNumber(users?.length)}
				</Typography>
				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
					sx={{ mt: 2, mb: 1 }}
				>
					<IconWrapperStyle
						sx={{
							...(percentIncrease < 0 && {
								color: "error.main",
								bgcolor: alpha(theme.palette.error.main, 0.16),
							}),
						}}
					>
						<Icon
							width={16}
							height={16}
							icon={percentIncrease >= 0 ? trendingUpFill : trendingDownFill}
						/>
					</IconWrapperStyle>
					<Typography component="span" variant="subtitle2">
						{percentIncrease > 0 && "+"}
						{`${fPercent(percentIncrease)}  (${quantity})`}
					</Typography>
				</Stack>

				<RadioGroupStyle
					row
					name="spacing"
					value={period.toString()}
					onChange={handleChangeSpacing}
				>
					{[
						{ name: "1 день", value: 1 },
						{ name: "7 дней", value: 7 },
						{ name: "14 дней", value: 14 },
						{ name: "30 дней", value: 30 },
						{ name: "90 дней", value: 90 },
						{ name: "180 дней", value: 180 },
					].map((item) => (
						<FormControlLabel
							key={item.name}
							value={item.value}
							label={item.name}
							sx={{ color: "common.white", width: "100px" }}
							control={<Radio />}
						/>
					))}
				</RadioGroupStyle>
			</Box>
		</Card>
	);
};

export default TotalUsers;
