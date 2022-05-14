// material
import { styled } from "@mui/material/styles";
import { Container } from "@mui/material";
import TermsNavigation from "./TermsNavigation";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
	position: "relative",
	minHeight: 315,
	background: "linear-gradient(-45deg,#51c5cf,#8ffc6ba6)",
}));

// ----------------------------------------------------------------------

export default function TermsHero() {
	return (
		<RootStyle>
			<Container
				maxWidth="lg"
				sx={{
					position: "absolute",
					bottom: -44,
					left: "50%",
					transform: "translate(-50%, 0)",
				}}
			>
				<TermsNavigation />
			</Container>
		</RootStyle>
	);
}
