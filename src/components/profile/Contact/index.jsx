// material
import { Grid } from "@mui/material";
// componets
import ProfileContactForm from "../../forms/ProfileContactForm";
import QuestionAnswer from "./QuestionAnswer";

export default function Contact() {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<QuestionAnswer />
			</Grid>
			<Grid item xs={12} md={6}>
				<ProfileContactForm />
			</Grid>
		</Grid>
	);
}
