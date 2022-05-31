import { useSnackbar } from "notistack";
// material
import {
	Stack,
	TableRow,
	TableCell,
	Typography,
	styled,
	IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";

import Image from "next/image";
import { LoadingButton } from "@mui/lab";

import BaselineSetting from "@iconify/icons-ic/baseline-settings";
import BaselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import { useState } from "react";
import {
	deleteCoverYouTubeVideo,
	deleteVideo,
} from "../../../helpers/api/api-youtubeVideos";
import { useSWRConfig } from "swr";

//---------------------------------------------------------------------------

const CardMediaStyle = styled("div")(({ theme }) => ({
	display: "flex",
	position: "relative",
	justifyContent: "center",
	paddingTop: "calc(100% * 9 / 16)",
	"&:before": {
		top: 0,
		zIndex: 9,
		content: "''",
		width: "100%",
		height: "100%",
		position: "absolute",
		borderTopLeftRadius: theme.shape.borderRadiusMd,
		borderTopRightRadius: theme.shape.borderRadiusMd,
	},
}));

//---------------------------------------------------------------------------

export default function VideoRow({ video, onUpdateVideo }) {
	const [isSubmitting, setSubmitting] = useState(false);
	const { enqueueSnackbar } = useSnackbar();

	const { mutate } = useSWRConfig();

	async function deleteVideoHandler(video) {
		setSubmitting(true);

		const response = await deleteVideo(video._id);

		if (!response.ok) {
			enqueueSnackbar(
				`Не удалось удалить видео [ код ${response.code} ошибка: ${response.message} ]`,
				{
					variant: "error",
				}
			);
			setSubmitting(false);
			return;
		}

		const resUpload = await deleteCoverYouTubeVideo(video.cover.id);

		if (!resUpload || !resUpload.success) {
			enqueueSnackbar(
				`Не удалось удалить обложку [ код ${resUpload.code} ошибка: ${resUpload.message} ]`,
				{
					variant: "error",
				}
			);
		}

		mutate(`/api/youtubeVideos`);

		enqueueSnackbar(`Успешно`, {
			variant: "success",
		});

		setSubmitting(false);
	}

	const coverUrl =
		process.env.publitio_youtube_video_covers_folder + video?.cover?.url;

	return (
		<TableRow>
			<TableCell>
				<CardMediaStyle>
					<Image
						alt="profile-cover"
						src={coverUrl}
						layout="fill"
						objectFit="cover"
						loading="lazy"
					/>
				</CardMediaStyle>
			</TableCell>
			<TableCell>{video.title}</TableCell>
			<TableCell>{video.description}</TableCell>
			<TableCell>{video.youtubeId}</TableCell>
			<TableCell
				sx={{
					padding: 0,
				}}
			>
				<IconButton
					onClick={() => onUpdateVideo(video)}
					color="primary"
					sx={{
						padding: 0,
					}}
				>
					<Icon icon={BaselineSetting} width={30} height={30} />
				</IconButton>
			</TableCell>

			<TableCell
				sx={{
					padding: 0,
					//paddingRight: { xs: "0 !important", md: "24px !important" },
				}}
			>
				<LoadingButton
					loading={isSubmitting}
					onClick={() => deleteVideoHandler(video)}
					color="error"
				>
					<Icon icon={BaselineDeleteForever} width={30} height={30} />
				</LoadingButton>
			</TableCell>
		</TableRow>
	);
}
