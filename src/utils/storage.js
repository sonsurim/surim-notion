const STORAGE = window.sessionStorage;

const getItemFromStorage = (key, defaultValue) => {
	try {
		const parsedItem = JSON.parse(STORAGE.getItem(key));

		if (typeof parsedItem !== 'object') {
			throw new Error('올바른 데이터 형식이 아닙니다!');
		}

		return parsedItem;
	} catch (e) {
		STORAGE.removeItem(key);
		console.log(e.message);
		return defaultValue;
	}
};

const setItemToStorage = (key, item) => {
	STORAGE.setItem(key, JSON.stringify(item));
};

export { getItemFromStorage, setItemToStorage };
