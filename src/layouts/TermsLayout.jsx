import { Container, styled } from "@mui/material";
import TermsHero from "../components/terms-of-service/TermsHero";

//-------------------------------------------------
const RootStyle = styled("div")(({ theme }) => ({
	position: "relative",
	minHeight: "100%",
}));

//-------------------------------------------------

function Layout({ children }) {
	return (
		<RootStyle>
			<TermsHero />
			<Container maxWidth="lg" sx={{ my: 12 }}>
				{children}
			</Container>
		</RootStyle>
	);
}

const withTermsLayout = (Component) => {
	return function withLayoutComponent(props) {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};

export default withTermsLayout;
