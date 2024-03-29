import useSWR from "swr";
import { useState } from "react";
// material
import {
	Box,
	Table,
	Button,
	TableRow,
	Skeleton,
	TableCell,
	TableBody,
	CardHeader,
	TableContainer,
} from "@mui/material";
//components
import Heads from "./Heads";
import VideoRow from "./VideoRow";
import Scrollbar from "../../Scrollbar";
import VideoUpdateForm from "./VideoUpdateForm";
import SkeletonLoad from "../../UI/skeleton/Skeleton";
//icons
import { Icon } from "@iconify/react";
import BaselineGroups from "@iconify/icons-ic/baseline-groups";

export default function VideoList() {
	const [video, setVideo] = useState(null);

	const { data, error } = useSWR(`/api/youtubeVideos`);

	const isLoading = !data && !error;

	const createVideoHandler = (video) => {
		setVideo(
			video
				? { ...video }
				: {
						cover: null,
						title: "",
						youtubeId: "",
						description: "",
				  }
		);
	};

	function cancelVideoHandler() {
		setVideo(null);
	}

	if (error) return "Ошибка!";

	return (
		<>
			<CardHeader
				title="Видео"
				sx={{ mb: 3 }}
				avatar={<Icon icon={BaselineGroups} width={26} height={26} />}
				action={
					video ? (
						<Button
							color="error"
							variant="contained"
							size="large"
							onClick={cancelVideoHandler}
							sx={{ backgroundColor: "red" }}
						>
							Отменить
						</Button>
					) : (
						<Button
							variant="contained"
							size="large"
							onClick={() => createVideoHandler(null)}
						>
							Создать
						</Button>
					)
				}
			/>

			{video && (
				<VideoUpdateForm
					//updateVideoHandler={createVideoHandler}
					video={video}
					onClose={cancelVideoHandler}
				/>
			)}

			<Scrollbar>
				<TableContainer>
					<Table>
						<Heads />
						<TableBody>
							{isLoading && (
								<TableRow>
									<TableCell colSpan={"100%"}>
										<SkeletonLoad num={5} variant="text" height={100} />
									</TableCell>
								</TableRow>
							)}
							{data &&
								data?.youtubeVideos.map((video) => (
									<VideoRow
										key={video._id}
										video={video}
										onUpdateVideo={createVideoHandler}
									/>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Scrollbar>
		</>
	);
}
