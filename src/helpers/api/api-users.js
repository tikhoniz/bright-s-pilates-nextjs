import PublitioAPI from "publitio_js_sdk";
const publitio = new PublitioAPI(
	process.env.publitio_api_key,
	process.env.publitio_secret_key
);

//* @desc Create a user
//* @route POST /api/auth/singup
//* @access Public
export async function createUser({ name, email, image, password, provider }) {
	const response = await fetch(`${process.env.localhost}/api/auth/singup`, {
		method: "POST",
		body: JSON.stringify({ name, email, image, password, provider }),
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

//* @desc Upload Avatar to Publitio
//* @route ------
//* @access Private
export async function uploadAvatarPublitio(avatar) {
	const response = publitio
		.uploadFile(avatar.file, "file", {
			folder: "userAvatars",
			title: avatar.id + "-avatar",
			public_id: avatar.id + "-avatar",
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
export async function updateUserProfile(user) {
	const response = await fetch(`/api/users/${user.id}`, {
		method: "PATCH",
		body: JSON.stringify(user),
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

//* @desc Add last login time to user profile
//* @route PUT /api/users/:slug
//* @access Private
//export async function saveLastUserLogin(userId) {
//	const response = await fetch(`${process.env.localhost}/api/users/${userId}`, {
//		method: "PUT",
//		body: JSON.stringify({}),
//		headers: { "Content-Type": "application/json" },
//	})
//		.then(async (response) => {
//			if (response.ok) {
//				return response.json();
//			}
//			//если ответ не response.ok
//			const data = await response.json();
//			throw new Error(data.message || "Something went wrong!");
//		})
//		.catch((error) => {
//			return error;
//		});

//	return response;
//}

//* @desc Change mode zoom
//* @route PUT /api/users/zoom/:slug
//* @access Private
export async function changeZoomMode(userId, mode) {
	const response = await fetch(
		//`${process.env.localhost}/api/users/zoom/${userId}`,
		`/api/users/zoom/${userId}`,
		{
			method: "PUT",
			body: JSON.stringify({ mode }),
			headers: { "Content-Type": "application/json" },
		}
	)
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

//* @desc Reset user password
//* @route POST /api/users/new-password/:slug
//* @access Private
export async function resetPassword(email, locale) {
	const response = await fetch(
		//`${process.env.localhost}/api/users/new-password/${email}`,
		`/api/users/new-password/${email}`,
		{
			method: "POST",
			body: JSON.stringify({ locale }),
			headers: { "Content-Type": "application/json" },
		}
	)
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			} else {
				//если ответ не response.ok
				const data = await response.json();
				throw new Error(data.message || "Something went wrong!");
			}
		})
		//.then((data) => {
		//	return data;
		//})
		.catch((error) => {
			return error;
		});

	return response;
}

//* @desc Reset user password
//* @route PATCH /api/users/new-password/:slug
//* @access Private
export async function setNewPassword(password, token) {
	const response = await fetch(
		//`${process.env.localhost}/api/users/new-password/${token}`,
		`/api/users/new-password/${token}`,
		{
			method: "PATCH",
			body: JSON.stringify({ password }),
			headers: { "Content-Type": "application/json" },
		}
	)
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			} else {
				//если ответ не response.ok
				const data = await response.json();
				throw new Error(data.message || "Something went wrong!");
			}
		})
		//.then((data) => {
		//	return data;
		//})
		.catch((error) => {
			return error;
		});

	return response;
}
