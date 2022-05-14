import { useState } from "react";
// material
import {
	Stack,
	Accordion,
	Typography,
	Pagination,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
// components
import Loader from "../../UI/Loader";
//icons
import { Icon } from "@iconify/react";
import roundAddAPhoto from "@iconify/icons-ic/baseline-mark-email-read";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
import { MotionInView, varFadeIn } from "../../animate";

// ----------------------------------------------------------------------

export default function QuestionAnswerList({ messages }) {
	const [page, setPage] = useState(1);
	const ROWS_PER_PAGE = 5;

	const qtyMessages = messages.length;
	const count = Math.ceil(qtyMessages / ROWS_PER_PAGE);
	const begin = page - 1;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	if (qtyMessages <= 0)
		return (
			<Typography variant="subtitle1" sx={{ color: "#229a16 !important" }}>
				Нет сообщений
			</Typography>
		);

	return (
		<>
			{messages
				.slice(begin * ROWS_PER_PAGE, begin * ROWS_PER_PAGE + ROWS_PER_PAGE)
				.map((msg) => (
					<MotionInView variants={varFadeIn} key={msg._id}>
						<Accordion disabled={!msg.response} disableGutters>
							<AccordionSummary
								expandIcon={
									<Icon
										icon={msg.response ? arrowIosDownwardFill : roundAddAPhoto}
										width={20}
										height={20}
									/>
								}
							>
								<Stack>
									{!msg.response ? (
										<Typography variant="subtitle1">
											<Loader message="Мы ответим в ближайшее время" />
										</Typography>
									) : (
										<Typography
											variant="subtitle1"
											sx={{ color: "#229a16 !important" }}
										>
											Вам ответили
										</Typography>
									)}
									<Typography variant="subtitle1">
										Тема: {msg.subject}
									</Typography>
									<Typography variant="caption">
										Сообщение: {msg.message}
									</Typography>
								</Stack>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>Ответ: {msg.response}</Typography>
							</AccordionDetails>
						</Accordion>
					</MotionInView>
				))}

			{qtyMessages > ROWS_PER_PAGE && (
				<Pagination
					page={page}
					count={count}
					color="primary"
					shape="rounded"
					onChange={handleChangePage}
				/>
			)}
		</>
	);
}
