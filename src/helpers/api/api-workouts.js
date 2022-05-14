//* @desc  Create a workout
//* @route  POST /api/workouts
//* @access  Private/Admin
export async function createWorkout(userEmail) {
	const response = await fetch(`${process.env.localhost}/api/workouts`, {
		method: "POST",
		body: JSON.stringify({ user: userEmail }),
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			return response.json().then((data) => {
				throw new Error(
					data.message || "Something went wrong! [API function createWorkout]"
				);
			});
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			return error;
		});

	return response;
}
//* @desc  Updated a workout
//* @route  PATCH /api/workouts/:slug
//* @access  Private/Admin
export const updateWorkout = async (workout) => {
	const response = await fetch(`/api/workouts/${workout.id}`, {
		method: "PATCH",
		body: JSON.stringify(workout),
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			return response.json().then((data) => {
				throw new Error(
					data.message || "Something went wrong! [API function createWorkout]"
				);
			});
		})
		.catch((error) => {
			return error;
		});

	return response;
};
//* @desc  Delete workout
//* @route  DELETE /api/workouts/:slug
//* @access  Private/Admin
export const deleteWorkout = async (workout) => {
	const response = await fetch(`/api/workouts/${workout._id}`, {
		method: "DELETE",
		body: JSON.stringify(workout),
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
			//если ответ не response.ok
			return response.json().then((data) => {
				throw new Error(
					data.message || "Something went wrong! [API deleteWorkout]"
				);
			});
		})
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.log(error);
			return error;
		});
	return response;
};
