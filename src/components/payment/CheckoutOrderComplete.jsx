import { useEffect } from "react";
// material
import { Box, Button, Divider, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material";
// animation
import { DialogAnimate, varFadeIn } from "../animate";
import { shootFireworks } from "../../helpers/shootFireworks";
// icons
import { Icon } from "@iconify/react";
import baselineClose from "@iconify/icons-ic/baseline-close";
import personFill from "@iconify/icons-eva/person-fill";
import baselineScheduleSend from "@iconify/icons-ic/baseline-schedule-send";
import SuccessPaymentIcon from "../icons/payment/icon_success_payment";
import { fCurrency } from "../../utils/formatNumber";

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
	"& .MuiDialog-paper": {
		margin: 0,
		[theme.breakpoints.up("md")]: {
			maxWidth: "calc(100% - 48px)",
			maxHeight: "calc(100% - 48px)",
		},
	},
}));

// ----------------------------------------------------------------------

export default function CheckoutOrderComplete({ error, data, router }) {
	const { discountPrice, order, price, type } = data;
	useEffect(() => {
		shootFireworks();
	}, []);

	return (
		<DialogStyle fullScreen open animate={varFadeIn}>
			<Box sx={{ p: 4, maxWidth: 480, margin: "auto" }}>
				{!error && !data && (
					<Box sx={{ textAlign: "center" }}>
						<Typography variant="h4" paragraph>
							Загрузка...
						</Typography>
					</Box>
				)}
				{error && (
					<Box sx={{ textAlign: "center" }}>
						<Typography variant="h4" paragraph>
							Произошла ошибка!
						</Typography>
					</Box>
				)}
				{data && (
					<>
						<Box sx={{ textAlign: "center" }}>
							<Typography variant="h4" paragraph>
								Оплата прошла успешно!
							</Typography>

							<Typography variant="h4" paragraph>
								<span>
									{order} {type === "group" && " в группе"}
									{type === "personal" && "персональная"}
								</span>
							</Typography>

							<Typography variant="h4" paragraph>
								<span>
									{discountPrice ? fCurrency(discountPrice) : fCurrency(price)}
								</span>
							</Typography>
							<SuccessPaymentIcon sx={{ height: 260, my: 5 }} />

							<Typography
								sx={{ textAlign: { xs: "center", sm: "left" } }}
								paragraph
							>
								Спасибо, что выбрали нас! &nbsp;
							</Typography>

							<Typography
								sx={{ textAlign: { xs: "center", sm: "left" } }}
								paragraph
							>
								Если у Вас остались вопросы, пожалуйста, свяжитесь с нами.
								&nbsp;
							</Typography>

							<Stack
								direction={{ xs: "column", sm: "row" }}
								alignItems="center"
								justifyContent="space-between"
								spacing={1}
							>
								<Typography align="left">До встречи на занятиях,</Typography>
								<Button
									size="small"
									color="inherit"
									variant="outlined"
									onClick={() => router.push("/schedule")}
									startIcon={<Icon icon={baselineScheduleSend} />}
									sx={{ fontSize: 14 }}
								>
									Расписание
								</Button>
							</Stack>
						</Box>

						<Divider sx={{ my: 3 }} />
						<Stack direction="row" justifyContent="space-between" spacing={2}>
							<Button
								color="inherit"
								onClick={() => router.push("/pricing")}
								startIcon={<Icon icon={baselineClose} />}
							>
								Закрыть
							</Button>
							<Button
								variant="outlined"
								onClick={() => router.push("/profile")}
								startIcon={<Icon icon={personFill} />}
							>
								Профиль
							</Button>
						</Stack>
					</>
				)}
			</Box>
		</DialogStyle>
	);
}
