export const findParticipants = (users, cls) => {
	return users.reduce((arr, user) => {
		user.groupList?.forEach((id) => {
			if (cls._id === id) {
				return arr.push({ id: user._id, email: user.email });
			}
		});
		return arr;
	}, []);
};
