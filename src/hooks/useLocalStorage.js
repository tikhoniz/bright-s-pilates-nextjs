import { useState, useEffect } from "react";

// ----------------------------------------------------------------------

export default function useLocalStorage(key, defaultValue) {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);
		return storedValue === null ? defaultValue : JSON.parse(storedValue);
	});

	useEffect(() => {
		const listener = (evt) => {
			if (evt.storageArea === localStorage && evt.key === key) {
				setValue(JSON.parse(evt.newValue));
			}
		};
		window.addEventListener("storage", listener);

		return () => {
			window.removeEventListener("storage", listener);
		};
	}, [key, defaultValue]);

	const setValueInLocalStorage = (newValue) => {
		setValue((currentValue) => {
			const result =
				typeof newValue === "function" ? newValue(currentValue) : newValue;
			localStorage.setItem(key, JSON.stringify(result));
			return result;
		});
	};

	return [value, setValueInLocalStorage];
}
