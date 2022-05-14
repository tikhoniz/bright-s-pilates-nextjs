export function filterUpcomingClasses(classes, delay) {
	const filtered = classes
		.filter(
			(cls) =>
				new Date(cls.startTime).getTime() + delay * 60 * 1000 >=
				new Date().getTime()
		)
		.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

	return filtered;
}

export function filterComletedClasses(classes, delay) {
	const filtered = classes
		.filter(
			(cls) =>
				new Date(cls.startTime).getTime() + delay * 60 * 1000 <
				new Date().getTime()
		)
		.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

	return filtered;
}
