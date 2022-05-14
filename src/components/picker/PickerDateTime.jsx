// material
import { TextField } from "@mui/material";
import { MobileDateTimePicker } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ruLocale from "date-fns/locale/ru";

// ----------------------------------------------------------------------

export default function PickerDateTime({ value, onChange }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
			<MobileDateTimePicker
				ampm={false}
				showTodayButton
				inputFormat="dd MMMM yyyy HH:mm"
				value={value}
				onChange={onChange}
				renderInput={(params) => (
					<TextField {...params} fullWidth margin="normal" />
				)}
				autoOk={false}
				toolbarTitle="Дата и время тренировки"
				cancelText="Отменить"
				todayText="Сегодня"
				okText="СОХРАНИТЬ"
				//openTo="month"
			/>
		</LocalizationProvider>
	);
}
