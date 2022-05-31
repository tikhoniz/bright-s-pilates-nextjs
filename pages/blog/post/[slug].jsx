// material
import { styled } from "@mui/material";
// components
import { Box, Typography } from "@mui/material";

import { useRouter } from "next/router";
import useSWR from "swr";
import BlogPost from "../../../src/components/blog/BlogPost";
import Page from "../../../src/components/Page";

//-------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
	minHeight: "100%",
	paddingTop: theme.spacing(14),
	paddingBottom: theme.spacing(5),
	[theme.breakpoints.up("md")]: {
		paddingTop: theme.spacing(19),
		paddingBottom: theme.spacing(10),
	},
}));

//-------------------------------------------------
const SingleBlogPostPage = () => {
	return (
		<RootStyle title="Пост | Bright's Pilates" description="Пост">
			<h1 className="visually-hidden">Пост</h1>
			<BlogPost />
		</RootStyle>
	);
};

export default SingleBlogPostPage;
