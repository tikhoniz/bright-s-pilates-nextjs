import { useEffect } from "react";
import { sentenceCase } from "change-case";
// material
import {
	Box,
	Card,
	Divider,
	Skeleton,
	Container,
	Typography,
	Pagination,
} from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import BlogPostHero from "./BlogPostHero";
import Markdown from "../../Markdown";
import BlogPostCommentList from "./BlogPostCommentList";
import BlogPostCommentForm from "./BlogPostCommentForm";

// components
//import Page from "../../Page";

//import Page from '../../components/Page';
//import Markdown from '../../components/Markdown';
//import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
//import {
//  BlogPostHero,
//  BlogPostTags,
//  BlogPostRecent,
//  BlogPostCommentList,
//  BlogPostCommentForm
//} from '../../components/_dashboard/blog';

// ----------------------------------------------------------------------

const SkeletonLoad = (
	<>
		<Skeleton
			width="100%"
			height={560}
			variant="rectangular"
			sx={{ borderRadius: 2 }}
		/>
		<Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
			<Skeleton variant="circular" width={64} height={64} />
			<Box sx={{ flexGrow: 1, ml: 2 }}>
				<Skeleton variant="text" height={20} />
				<Skeleton variant="text" height={20} />
				<Skeleton variant="text" height={20} />
			</Box>
		</Box>
	</>
);

export default function BlogPost() {
	const router = useRouter();

	const { slug } = router.query;

	const { data, error, isValidating, mutate } = useSWR(
		slug ? `/api/blog/posts/${slug}` : null
		//options
	);

	return (
		<Container maxWidth="lg">
			{/*<HeaderBreadcrumbs
				heading="Post Details"
				links={[
					{ name: "Dashboard", href: PATH_DASHBOARD.root },
					{ name: "Blog", href: PATH_DASHBOARD.blog.root },
					{ name: sentenceCase(title) },
				]}
			/>*/}

			{data && (
				<Card>
					<BlogPostHero post={data} />

					<Box sx={{ p: { xs: 3, md: 5 } }}>
						<Typography variant="h6" sx={{ mb: 5 }}>
							{data.description}
						</Typography>

						<Markdown children={data.body} />

						<Box sx={{ my: 5 }}>
							<Divider />
							{/*<BlogPostTags post={data} />*/}
							<Divider />
						</Box>

						{data.comments && (
							<>
								<Box sx={{ display: "flex", mb: 2 }}>
									<Typography variant="h4">Комментарии</Typography>
									<Typography
										variant="subtitle1"
										//sx={{ color: "text.disabled" }}
									>
										({data.comments.length})
									</Typography>
								</Box>

								<BlogPostCommentList post={data} mutate={mutate} />

								<Box
									sx={{
										mb: 5,
										mt: 3,
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									<Pagination count={8} color="primary" />
								</Box>
								<BlogPostCommentForm post={data} mutate={mutate} />
							</>
						)}
					</Box>
				</Card>
			)}

			{!data && !error && SkeletonLoad}

			{error && <Typography variant="h6">404 Post not found</Typography>}

			{/*{recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />}*/}
		</Container>
	);
}
