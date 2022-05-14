// material
import { Icon } from "@iconify/react";
import {
	Box,
	Typography,
	Stack,
	Switch,
	RadioGroup,
	Radio,
	FormControlLabel,
	Grid,
} from "@mui/material";
import checkmarkCircle2Fill from "@iconify/icons-eva/checkmark-circle-2-fill";

// ----------------------------------------------------------------------

const TogglePrice = ({ tooglePriceHandler, checked }) => {
	return (
		<RadioGroup name="pricing" value={checked} onChange={tooglePriceHandler}>
			<Grid
				container
				spacing={2}
				justifyContent="center"
				alignItems="center"
				flexWrap="nowrap"
				sx={{ mt: 6, mb: 3 }}
			>
				<Grid
					item
					xs={12}
					md={3}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<FormControlLabel
						value="group"
						control={
							<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />
						}
						label={
							<Box>
								<Typography variant="subtitle2">ГРУППОВЫЕ</Typography>
							</Box>
						}
					/>
				</Grid>

				<Grid
					item
					xs={12}
					md={3}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<FormControlLabel
						value="personal"
						control={
							<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />
						}
						label={
							<Box>
								<Typography variant="subtitle2">ПЕРСОНАЛЬНЫЕ</Typography>
							</Box>
						}
					/>
				</Grid>
			</Grid>
		</RadioGroup>
	);
};

export default TogglePrice;
