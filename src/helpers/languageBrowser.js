export default function determineLanguage() {
	const language =
		window.navigator &&
		(window.navigator.language ||
			window.navigator.systemLanguage ||
			window.navigator.userLanguage);

	return language;
}
