const UPDATE_STATE = 'update:state';
const SHOW_MODAL = 'show:modal';
const UPDATE_MODAL = 'update:modal';
const TOGGLE_LIST = 'toggle:list';
const CREATE_DOCUMENT = 'create:document';
const READ_DOCUMENT = 'read:document';
const UPDATE_DOCUMENT = 'update:document';
const DELETE_DOCUMENT = 'delete:document';
const DELETE_DOCUMENT_EMPTY = 'delete:emptyDocument';

const on = {
	initRouter(onUpdate) {
		window.addEventListener('popstate', e => {
			onUpdate();
		});
	},
	initStore(onUpdate) {
		window.addEventListener(UPDATE_STATE, e => {
			const { nextState, needRender } = e.detail;
			onUpdate(nextState, needRender);
		});
	},
	showModal(onShow) {
		window.addEventListener(SHOW_MODAL, e => {
			onShow();
		});
	},
	updateModal(onUpdate) {
		window.addEventListener(UPDATE_MODAL, e => {
			const { nextState } = e.detail;
			onUpdate(nextState);
		});
	},
	toggleList(onToggle) {
		window.addEventListener(TOGGLE_LIST, e => {
			const { act, $li } = e.detail;
			onToggle({ act, $li });
		});
	},
	createDocument(onCreate) {
		window.addEventListener(CREATE_DOCUMENT, e => {
			const { id, $target, needMark, onModal } = e.detail;
			onCreate({ id, $target, needMark, onModal });
		});
	},
	readDocument(onRead) {
		window.addEventListener(READ_DOCUMENT, e => {
			const { id } = e.detail;
			onRead(id);
		});
	},
	updateDocument(onUpdate) {
		window.addEventListener(UPDATE_DOCUMENT, e => {
			const { id, nextDocument, onModal } = e.detail;

			if (id && nextDocument) {
				onUpdate({ id, nextDocument, onModal });
			}
		});
	},
	deleteDocument(onDelete) {
		window.addEventListener(DELETE_DOCUMENT, e => {
			const { id, isCurrent } = e.detail;

			if (id) {
				onDelete(id, isCurrent);
			}
		});
	},
	deleteEmptyDocument(onDelete) {
		window.addEventListener(DELETE_DOCUMENT_EMPTY, e => {
			const { id } = e.detail;

			if (id) {
				onDelete(id);
			}
		});
	},
};
const emit = {
	updateState(nextState, needRender) {
		window.dispatchEvent(
			new CustomEvent(UPDATE_STATE, {
				detail: {
					nextState,
					needRender,
				},
			}),
		);
	},
	showModal() {
		window.dispatchEvent(new CustomEvent(SHOW_MODAL));
	},
	updateModal(nextState) {
		window.dispatchEvent(
			new CustomEvent(UPDATE_MODAL, {
				detail: {
					nextState,
				},
			}),
		);
	},
	toggleList({ act, $li }) {
		window.dispatchEvent(
			new CustomEvent(TOGGLE_LIST, {
				detail: { act, $li },
			}),
		);
	},
	createDocument({ id, $target, needMark, onModal }) {
		window.dispatchEvent(
			new CustomEvent(CREATE_DOCUMENT, {
				detail: {
					id,
					$target,
					needMark,
					onModal,
				},
			}),
		);
	},
	readDocument(id) {
		window.dispatchEvent(
			new CustomEvent(READ_DOCUMENT, {
				detail: { id },
			}),
		);
	},
	updateDocument({ id, nextDocument, onModal }) {
		window.dispatchEvent(
			new CustomEvent(UPDATE_DOCUMENT, {
				detail: { id, nextDocument, onModal },
			}),
		);
	},
	deleteDocument(id, isCurrent) {
		window.dispatchEvent(
			new CustomEvent(DELETE_DOCUMENT, {
				detail: { id, isCurrent },
			}),
		);
	},
	deleteEmptyDocument(id) {
		window.dispatchEvent(
			new CustomEvent(DELETE_DOCUMENT_EMPTY, {
				detail: { id },
			}),
		);
	},
};

export { on, emit };
