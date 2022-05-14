export function getCurrentTime() {
	return new Date().getTime();
}

export function getEventTime(event) {
	return new Date(event).getTime();
}

export function humanReadableDate(time, locale) {
	const date = new Date(time);
	return date.toLocaleDateString(locale, {
		day: "2-digit",
		month: "long",
	});
}

export function humanReadableTime(time, locale) {
	const date = new Date(time);
	return date.toLocaleTimeString(locale, {
		hour: "numeric",
		minute: "numeric",
	});
}

export function humanReadableWeekday(time, locale) {
	const date = new Date(time);
	return date.toLocaleDateString(locale, {
		weekday: "long",
	});
}

export function dayMonthYearDate(time) {
	const date = new Date(time);
	// использует "en-GB" что  бы формат даты был 29/06/21
	// иначе показывает в разных браузерах по разному
	return date.toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	});
}
