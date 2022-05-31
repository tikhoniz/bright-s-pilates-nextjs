// material
import { Box, List } from "@mui/material";
import createAvatarsImageUrl from "../../../utils/createAvatarsImageUrl";
//
import BlogPostCommentItem from "./BlogPostCommentItem";

// ----------------------------------------------------------------------

export default function BlogPostCommentList({ post, mutate }) {
	const { _id: postId, comments } = post;

	return (
		<List disablePadding>
			{comments.map((comment) => {
				const { id, replyComment, users = [] } = comment;
				const hasReply = replyComment.length > 0;
				const avatarUrl = createAvatarsImageUrl(comment.avatarUrl);

				return (
					<Box key={id} sx={{}}>
						<BlogPostCommentItem
							postId={postId}
							commentId={comment.id}
							name={comment.name}
							avatarUrl={avatarUrl}
							postedAt={comment.postedAt}
							message={comment.message}
							post={post}
							mutate={mutate}
						/>
						{hasReply &&
							replyComment.map((reply) => {
								const avatarUrl = createAvatarsImageUrl(reply.avatarUrl);
								//const user = users.find((user) => user.id === reply.userId);

								return (
									<BlogPostCommentItem
										key={reply.id}
										message={reply.message}
										tagUser={reply.tagUser}
										postedAt={reply.postedAt}
										name={reply.name}
										avatarUrl={avatarUrl}
										hasReply
									/>
								);
							})}
					</Box>
				);
			})}
		</List>
	);
}
