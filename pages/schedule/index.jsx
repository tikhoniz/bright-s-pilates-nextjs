// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import Schedule from "../../src/components/schedule";

//-------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(10),
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("sm")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(15),
		paddingBottom: theme.spacing(15),
	},
}));
//-------------------------------------------------

const SchedulePage = () => {
	return (
		<RootStyle
			title="Расписание | Bright's Pilates"
			description="Выбирайте удобное время для онлайн тренировки и присоединяйтесь"
		>
			<h1 className="visually-hidden">Расписание</h1>

			<Schedule />
		</RootStyle>
	);
};

export default SchedulePage;
