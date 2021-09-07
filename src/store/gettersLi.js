import { isValidOpenedLi } from '../utils/valid.js';
import { getItemFromStorage, setItemToStorage } from '../utils/storage.js';

const getOpenedLiAfter = (action, option) => {
	try {
		const newOpenedLi = gettersLi[action](option);

		isValidOpenedLi(newOpenedLi);

		gettersLi.openedLi = newOpenedLi;
		setItemToStorage('openedLi', newOpenedLi);

		return newOpenedLi;
	} catch (e) {
		alert('List에 오류가 발생하여 notion을 다시 불러옵니다!');
		window.location = window.origin;
	}
};

const gettersLi = {
	openedLi: [],
	fetch: () => {
		gettersLi.openedLi = getItemFromStorage('openedLi', []) || [];
		return gettersLi.openedLi;
	},
	add: ({ id }) => {
		const newOpenedLi = [...gettersLi.openedLi];

		if (!newOpenedLi.includes(id)) {
			newOpenedLi.push(id);
		}

		return newOpenedLi;
	},
	delete: ({ id }) => {
		const newOpenedLi = [...gettersLi.openedLi];

		if (newOpenedLi.includes) {
			newOpenedLi.splice(newOpenedLi.indexOf(id), 1);
		}

		return newOpenedLi;
	},
};

export { getOpenedLiAfter };
