import { emit } from '../utils/emitter.js';

import {
	closeChildList,
	markListItemOfId,
	setListItemToDataId,
} from '../utils/render.js';

const setElementAfter = (action, options) => {
	setters[action](options);
};

const setters = {
	create: ({ nextState }) => {
		const newPostId = nextState.currentDocument.id;

		setListItemToDataId(newPostId);
	},
	createOnModal: ({ modalDocument }) => {
		const newPostId = modalDocument.id;

		setListItemToDataId(newPostId);
		emit.updateModal(modalDocument);
	},
	delete: ({ id, nextState }) => {
		closeChildList(id);
		markListItemOfId(nextState.id);
	},
	deleteCurrent: ({ id, nextState }) => {
		const nextId = nextState.currentDocument.id;
		let url = '/';

		if (nextId) {
			url = `/documents/${nextId}`;

			const $needRemoveSelected = $(`li[data-id="${id}"] .selected`);
			closeChildList(id);
			removeClass($needRemoveSelected, 'selected');
			markListItemOfId(nextId);
		}

		history.replaceState(null, null, url);
	},
};

export { setElementAfter };
