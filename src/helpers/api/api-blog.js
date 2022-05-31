import PublitioAPI from "publitio_js_sdk";
const publitio = new PublitioAPI(
	process.env.publitio_api_key,
	process.env.publitio_secret_key
);

//* @desc Create a blog post
//* @route POST /api/blog/posts
//* @access Private
export async function createBlogPost(props) {
	const response = await fetch(`/api/blog/posts`, {
		method: "POST",
		body: JSON.stringify({
			...props,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(data.message || "Something went wrong!");
		})
		.catch((error) => {
			return error;
		});
	return response;
}

//* @desc Upload a blog post cover to Publitio
//* @route ------
//* @access Private
export async function uploadCoverBlogPost(cover) {
	const title = cover.file.name.split(".")[0];

	const response = publitio
		.uploadFile(cover.file, "file", {
			folder: "postCovers",
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

//* @desc Create a post
//* @route POST /api/auth/singup
//* @access Public
export async function createBlogPostComment(comment, postId) {
	const response = await fetch(`/api/blog/comments/${postId}`, {
		method: "PUT",
		body: JSON.stringify({ comment }),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(data.message || "Something went wrong!");
		})
		.catch((error) => {
			return error;
		});

	return response;
}

//* @desc Create a post
//* @route POST /api/auth/singup
//* @access Public
export async function replayPostComment(newAnswer, commentId, postId) {
	const response = await fetch(`/api/blog/comments/${postId}`, {
		method: "PATCH",
		body: JSON.stringify({
			newAnswer,
			commentId,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(data.message || "Something went wrong!");
		})
		.catch((error) => {
			return error;
		});

	return response;
}

//* @desc Delete Avatar from Publitio
//* @route ------
//* @access Private
export async function deleteAvatarPublitio(id) {
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
}

//* @desc  Update user profile
//* @route  PATCH /api/users/:slug
//* @access  Private
export async function updateUserProfile({
	id,
	city,
	email,
	about,
	cover,
	avatar,
	country,
	displayName,
	phoneNumber,
	displayLastName,
}) {
	const response = await fetch(`/api/users/${id}`, {
		method: "PATCH",
		body: JSON.stringify({
			city,
			email,
			about,
			cover,
			avatar,
			country,
			phoneNumber,
			displayName,
			displayLastName,
		}),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(data.message || "Something went wrong!");
		})
		.catch((error) => {
			return error;
		});

	return response;
}
