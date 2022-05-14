import React from "react";

// material
import { Typography } from "@mui/material";

// ----------------------------------------------------------------------

const DescriptionPrice = () => {
	return (
		<>
			<Typography variant="h3" align="center" paragraph>
				Выберите подходящий Вам блок
				{/*<br /> community&apos;s size and needs*/}
				{/*<br /> на персональные занятия или в группе*/}
				<br /> групповых или персональных тренировок
			</Typography>
			<Typography align="center" sx={{ color: "text.secondary" }}>
				Все занятия проходят онлайн в формате реального времени
			</Typography>
		</>
	);
};

export default DescriptionPrice;
