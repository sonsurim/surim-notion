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

const isNeedProtect = id => {
	const PROTECT_DOCUMENT = ['16238', '16564', '17594', '17596', '18040', '18041', '18053', '18486', '18580', '19881', '18625', '18581', '19938', '19020', '19034', '19035', '19891'];
	let result = true;

	if (PROTECT_DOCUMENT.includes(id)) {
		alert('문서 지우지 말아주세요....🥺')
		result = false;
	}

	return result;
}

export { isValidState, isValidOpenedLi, isNeedProtect };