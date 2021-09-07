const isValidState = state => {
	const DEFAULT_STATE = {
		documents: {},
		currentDocument: {},
	};

	let validResult = true;

	if (state && typeof state === 'object') {
		for (let key in DEFAULT_STATE) {
			validResult = state.hasOwnProperty(key);
		}
	}

	if (!validResult) {
		throw new Error('올바른 데이터 형식이 아닙니다!');
	}
};

const isValidOpenedLi = openedLi => {
	if (!openedLi || !Array.isArray(openedLi)) {
		throw new Error('올바른 데이터 형식이 아닙니다!');
	}
};

export { isValidState, isValidOpenedLi };
