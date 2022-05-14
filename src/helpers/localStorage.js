 export function addToLocalStorage(key, data){
	localStorage.setItem(
		key.toString(),
		JSON.stringify(data)
	);
}

export  function  getFromLocalStorage(key){
	const value = window.localStorage.getItem(key);
	if (value !== null) {
		return (JSON.parse(value));
	}
}