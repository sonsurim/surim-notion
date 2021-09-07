import { isValidState } from '../utils/valid.js';
import { getItemFromStorage, setItemToStorage } from '../utils/storage.js';

import {
	getDocuments,
	createDocument,
	updateDocument,
	deleteDocument,
} from '../api/notion.js';

const getStateAfter = async (action, option) => {
	try {
		const newState = await getters[action](option);

		isValidState(newState);

		if (newState && !action.includes('Modal')) {
			setItemToStorage('notionState', newState);
		}

		return newState;
	} catch (e) {
		alert('state에 오류가 발생하여 notion을 다시 불러옵니다!');
		window.location = window.origin;
	}
};

const getters = {
	fetch: async () => {
		const nextState = {};

		const { pathname } = window.location;
		const [, , id] = pathname.split('/');
		let postId = id;

		nextState.documents = await getDocuments();

		if (postId) {
			nextState.currentDocument = await getDocuments(postId);
		} else {
			nextState.currentDocument = {};
		}

		return nextState;
	},
	create: async id => {
		const currentDocument = await createDocument({
			title: '',
			parent: id,
		});
		const documents = await getDocuments();

		return { documents, currentDocument };
	},
	createOnModal: async id => {
		const modalDocument = await createDocument({
			title: '',
			parent: id,
		});

		const documents = await getDocuments();
		const { currentDocument } = getItemFromStorage('notionState');

		setItemToStorage('notionState', { documents, currentDocument });
		return { documents, currentDocument, modalDocument };
	},
	read: async id => {
		const { documents } = getItemFromStorage('notionState');
		const currentDocument = await getDocuments(id);

		return { documents, currentDocument };
	},
	update: async ({ id, nextDocument }) => {
		const updatedDocument = await updateDocument(id, nextDocument);
		const documents = await getDocuments();

		return { documents, currentDocument: updatedDocument };
	},
	updateOnModal: async ({ id, nextDocument }) => {
		await updateDocument(id, nextDocument);
		const documents = await getDocuments();
		const { currentDocument } = getItemFromStorage('notionState');

		setItemToStorage('notionState', { documents, currentDocument });
		return { documents, currentDocument };
	},
	delete: async id => {
		await deleteDocument(id);

		const documents = await getDocuments();
		const { currentDocument } = getItemFromStorage('notionState');

		return { documents, currentDocument };
	},
	deleteCurrent: async id => {
		await deleteDocument(id);

		let postId;
		const documents = await getDocuments();

		if (documents.length) {
			postId = documents[0].id;
		}

		const currentDocument = await getDocuments(postId);
		return { documents, currentDocument };
	},
};

export { getStateAfter };
