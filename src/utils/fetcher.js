export async function fetcher(url) {
	const res = await fetch(url);

	if (!res.ok) {
		const error = new Error("Возникла ошибка при получении данных");

		const result = await res.json();
		// Добавление дополнительной информации в объект ошибки.
		error.info = result.message;
		error.status = res.status;

		console.log("error", error, "error.info", error.info);

		throw error;
	}

	return res.json();
}
