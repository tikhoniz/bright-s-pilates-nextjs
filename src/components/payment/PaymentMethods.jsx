import PropTypes from "prop-types";
// material
import {
	Stack,
	Paper,
	Radio,
	Button,
	Divider,
	Typography,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material";
//data
import payment from "../../data/payment";
// icons
import { Icon } from "@iconify/react";
import checkmarkCircle2Fill from "@iconify/icons-eva/checkmark-circle-2-fill";
import deleteOutlined from "@iconify/icons-ant-design/delete-outlined";

// -----------------------------STYLE---------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(3),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(5),
	},
}));

const OptionStyle = styled(Paper)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	paddingLeft: theme.spacing(2.5),
	paddingRight: theme.spacing(2),
	transition: theme.transitions.create("all"),
	border: `solid 1px ${theme.palette.grey[500_32]}`,
	width: "100%",
	marginBottom: "32px",
	maxWidth: "300px",

	[theme.breakpoints.up("sm")]: {
		width: "300px",
	},
}));

// ----------------------------------------------------------------------

PaymentMethods.propTypes = {
	formik: PropTypes.object,
};

export default function PaymentMethods({
	placeOrder,
	paymentMethod,
	setPaymentMethod,
}) {
	const handleChange = (evt) => {
		setPaymentMethod(evt.target.value);
	};

	return (
		<RootStyle>
			<Typography variant="subtitle1" sx={{ mb: 5 }}>
				Mетод оплаты
			</Typography>

			<RadioGroup onChange={handleChange}>
				{payment.map((method) => {
					const { value, title, icons } = method;
					return (
						<OptionStyle
							key={title}
							sx={{
								...(paymentMethod === value && {
									boxShadow: (theme) => theme.customShadows.z8,
								}),
							}}
						>
							<FormControlLabel
								value={value}
								checked={paymentMethod === value}
								control={
									<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />
								}
								label={
									<Typography variant="subtitle2" sx={{ ml: 1 }}>
										{title}
									</Typography>
								}
								sx={{ py: 3, mx: 0 }}
							/>

							<Stack direction="row" alignItems="center" spacing={1}>
								{icons.map((icon) => (
									<img key={icon} alt="logo card" src={icon} />
								))}
							</Stack>
						</OptionStyle>
					);
				})}
			</RadioGroup>
			<>
				<Divider sx={{ mb: 4, width: "100%", maxWidth: "300px" }}>
					<Typography
						variant="subtitle2"
						sx={{
							color: "text.secondary",
						}}
					>
						ИЛИ
					</Typography>
				</Divider>

				<Button
					fullWidth
					size="large"
					onClick={() => placeOrder(false)}
					variant="outlined"
					startIcon={<Icon icon={deleteOutlined} />}
					sx={{ maxWidth: "300px" }}
				>
					Отменить Покупку
				</Button>
			</>
		</RootStyle>
	);
}
