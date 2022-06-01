import PublitioAPI from "publitio_js_sdk";
const publitio = new PublitioAPI(
	process.env.publitio_api_key,
	process.env.publitio_secret_key
);

//* @desc  Create a video
//* @route  POST /api/youtubeVideos
//* @access Admin
export const createVideo = async (props) => {
	const response = await fetch(`/api/youtubeVideos`, {
		method: "POST",
		//body: JSON.stringify({ userEmail }),
		body: JSON.stringify({ ...props }),

		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(
				data.message || "Something went wrong! [API function createWorkout]"
			);
		})
		.catch((error) => {
			return error;
		});

	return response;
};

////* @desc  Updated a online group class
////* @route  PATCH /api/youtubeVideos/:slug
////* @access Admin
export const updateVideoYT = async (video) => {
	const response = await fetch(`/api/youtubeVideos/${video._id}`, {
		method: "PATCH",
		body: JSON.stringify(video),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(
				data.message || "Something went wrong! [API function createWorkout]"
			);
		})
		.catch((error) => {
			return error;
		});

	return response;
};

//* @desc Upload a video cover to Publitio
//* @route ------
//* @access Private
export async function uploadCoverYouTubeVideo(cover) {
	const title = cover.file.name.split(".")[0];

	const response = publitio
		.uploadFile(cover.file, "file", {
			folder: "youtubeVideoCovers",
			title: title,
			public_id: cover.id + "-cover",
		})
		.then((response) => {
			if (response.success) {
				return response;
			} else {
				return response.error;
			}
		})
		.catch((error) => {
			console.log(error);
		});

	return response;
}

//* @desc a video cover from Publitio
//* @route ------
//* @access Private
export const deleteCoverYouTubeVideo = (id) => {
	// Delete file with id
	const response = publitio
		.call(`/files/delete/${id}`, "DELETE")
		.then((response) => {
			if (response.success) {
				return response;
			} else {
				return response.error;
			}
		})
		.catch((error) => {
			console.log(error);
		});

	return response;
};

////* @desc  Delete a online group class
////* @route  DELETE /api/classes/:slug
////* @access Admin
export const deleteVideo = async (videoId) => {
	const response = await fetch(`/api/youtubeVideos/${videoId}`, {
		method: "DELETE",
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(
				data.message || "Something went wrong! [API deleteWorkout]"
			);
		})
		.catch((error) => {
			console.log(error);
			return error;
		});

	return response;
};

//* @desc  Fetch Youtube videos
//* @route  POST /api/youtubeVideos
//* @access All
export const fetchYoutubeVideos = async () => {
	const response = await fetch(`${process.env.localhost}/api/youtubeVideos`, {
		method: "GET",
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(
				data.message || "Something went wrong! [API function createWorkout]"
			);
		})
		.catch((error) => {
			return error;
		});

	return response;
};
