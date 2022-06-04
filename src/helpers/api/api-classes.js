//* @desc  Create a group class
//* @route  POST /api/classes
//* @access Admin
export const createGroupClass = async (userEmail) => {
	const response = await fetch(`/api/classes/admin`, {
		method: "POST",
		body: JSON.stringify({ userEmail }),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}

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

//* @desc  Updated a online group class
//* @route  PATCH /api/classes/:slug
//* @access Admin
export const updateGroupClass = async (cls) => {
	const classId = cls.id;

	const response = await fetch(`/api/classes/admin/${classId}`, {
		method: "PATCH",
		body: JSON.stringify(cls),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}

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
////* @desc  Delete a online group class
////* @route  DELETE /api/classes/:slug
////* @access Admin
export const deleteClass = async (classId) => {
	const response = await fetch(`/api/classes/admin/${classId}`, {
		method: "DELETE",
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}

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

////* @desc  Join the class
////* @route  PATCH /api/classes/register/:slug
////* @access Private
export const registersForClass = async (userId, classId) => {
	const response = await fetch(`/api/classes/user/register/${classId}`, {
		method: "PATCH",
		body: JSON.stringify({ userId }),
		headers: { "Content-Type": "application/json" },
	})
		.then(async (response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			const data = await response.json();
			throw new Error(data.message || "Join to online class failed!");
		})
		.catch((error) => {
			return error;
		});

	return response;
};

////* @desc  Cancel the class
////* @route  PATCH /api/classes/user/cancel/:slug
////* @access Private
export const cancelUserGroup = async (userId, classId) => {
	const response = await fetch(`/api/classes/user/cancel/${classId}`, {
		method: "PATCH",
		body: JSON.stringify({ userId }),
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
			console.log(error);
			return error;
		});

	return response;
};
