// material
import { styled } from "@mui/material/styles";
// components
import Page from "../../src/components/Page";
import BlogPosts from "../../src/components/blog/BlogPosts";
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
const BlogPage = () => {
	return (
		<RootStyle title="Блог | Bright's Pilates" description="Блог">
			<h1 className="visually-hidden">Блог</h1>

			<BlogPosts />
		</RootStyle>
	);
};

export default BlogPage;
