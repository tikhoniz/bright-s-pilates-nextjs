import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { paramCase } from "change-case";
import {
	Box,
	Card,
	Grid,
	Avatar,
	Tooltip,
	Divider,
	Typography,
	IconButton,
	CardContent,
} from "@mui/material";

import { styled, alpha } from "@mui/material";
import { Icon } from "@iconify/react";
import playCircleOutline from "@iconify/icons-eva/play-circle-outline";
import pauseCircleOutline from "@iconify/icons-eva/pause-circle-outline";
import shareFill from "@iconify/icons-eva/share-fill";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";
import eyeFill from "@iconify/icons-eva/eye-fill";
import { fDate } from "../../utils/time";
import { fShortenNumber } from "../../utils/formatNumber";
import SvgIconStyle from "../SvgIconStyle";

//----------------------------------------------------------------------

const CardMediaStyle = styled("div")(({ theme }) => ({
	position: "relative",
	paddingTop: "calc(100% * 3 / 4)",
}));

const TitleStyle = styled("a")(({ theme }) => ({
	...theme.typography.subtitle2,
	height: 44,
	color: "inherit",
	overflow: "hidden",
	WebkitLineClamp: 2,
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	textDecoration: "none",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const CoverImgStyle = styled("img")({
	top: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	position: "absolute",
});

const InfoStyle = styled("div")(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "flex-end",
	marginTop: theme.spacing(3),
	color: theme.palette.text.disabled,
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
	zIndex: 9,
	width: 32,
	height: 32,
	position: "absolute",
	left: theme.spacing(3),
	bottom: theme.spacing(-2),
}));
//----------------------------------------------------------------------

const BlogPostCard = ({ post, index }) => {
	//	author:
	//avatarUrl: "628559143f639500021a0ef1-avatar.jpg"
	//name: "admin"
	//[[Prototype]]: Object
	//body: "<p>sdposdfosdfpo </p><p>asdlsadkosa</p><p><img sr
	//comment: 0
	//comments: false
	//cover: {url: 'fd6c22f8-9995-47cf-8fa9-bb466f73891e-cover.jpg', id: 'mmfjGWBq'}
	//createdAt: "2022-05-19T18:44:05.000Z"
	//description: "sad;jsdpjpsdo sldjisudfsud siopdu9sduf09sdf"
	//favorite: 0
	//metaDescription: ""
	//metaKeywords: ['Logan']
	//metaTitle: ""
	//publish: true
	//tags: Array(1)
	//0: "Logan"
	//length: 1
	//[[Prototype]]: Array(0)
	//title: "jkshjkashdfkjsdfd"
	//view: 0
	//_id: "62868ff50a8b9a3f9bdaa289"
	const {
		_id: postId,
		cover,
		title,
		view,
		comment,
		share,
		author,
		createdAt = "2022-04-20T15:56:58.363Z",
	} = post;

	const authorUrl = process.env.publitio_avatars_folder + author?.avatarUrl;
	const coverUrl = process.env.publitio_covers_folder + cover?.url;

	const latestPostLarge = index === 0;
	const latestPost = index === 1 || index === 2;

	const POST_INFO = [
		//{ number: comment, icon: messageCircleFill },
		//{ number: view, icon: eyeFill },
		//{ number: share, icon: shareFill },

		{ number: 4, icon: messageCircleFill },
		{ number: 5, icon: eyeFill },
		//{ number: 6, icon: shareFill },
	];

	return (
		<Grid
			item
			xs={12}
			sm={latestPostLarge ? 12 : 6}
			md={latestPostLarge ? 6 : 3}
		>
			<Card>
				<CardMediaStyle
					sx={{
						...((latestPostLarge || latestPost) && {
							pt: "calc(100% * 4 / 3)",
							"&:after": {
								top: 0,
								content: "''",
								width: "100%",
								height: "100%",
								position: "absolute",
								bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
							},
						}),
						...(latestPostLarge && {
							pt: {
								xs: "calc(100% * 4 / 3)",
								sm: "calc(100% * 3 / 4.66)",
							},
						}),
					}}
				>
					<SvgIconStyle
						color="paper"
						src="/svg/shape-avatar.svg"
						sx={{
							width: 80,
							height: 36,
							zIndex: 9,
							bottom: -15,
							position: "absolute",
							...((latestPostLarge || latestPost) && { display: "none" }),
						}}
					/>
					<AvatarStyle
						alt={author?.name}
						src={authorUrl}
						sx={{
							...((latestPostLarge || latestPost) && {
								zIndex: 9,
								top: 24,
								left: 24,
								width: 40,
								height: 40,
							}),
						}}
					/>
					<CoverImgStyle alt={title} src={coverUrl} />
				</CardMediaStyle>

				<CardContent
					sx={{
						pt: 4,
						...((latestPostLarge || latestPost) && {
							bottom: 0,
							width: "100%",
							position: "absolute",
						}),
					}}
				>
					<Typography
						gutterBottom
						variant="caption"
						sx={{ color: "text.disabled", display: "block" }}
					>
						{fDate(createdAt)}
					</Typography>

					<NextLink href={`/blog/post/${postId}`} passHref>
						<TitleStyle
							sx={{
								...(latestPostLarge && { typography: "h5", height: 60 }),
								...((latestPostLarge || latestPost) && {
									color: "common.white",
								}),
							}}
						>
							{title}
						</TitleStyle>
					</NextLink>

					<InfoStyle>
						{POST_INFO.map((info, index) => (
							<Box
								key={index}
								sx={{
									display: "flex",
									alignItems: "center",
									ml: index === 0 ? 0 : 1.5,
									...((latestPostLarge || latestPost) && {
										color: "grey.500",
									}),
								}}
							>
								<Box
									component={Icon}
									icon={info.icon}
									sx={{ width: 16, height: 16, mr: 0.5 }}
								/>
								<Typography variant="caption">
									{fShortenNumber(info.number)}
								</Typography>
							</Box>
						))}
					</InfoStyle>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default BlogPostCard;
