import { on, emit } from '../../utils/emitter.js';
import { $createElement } from '../../utils/templates.js';
import {
	setCurrentLi,
	markListItemOfId,
	checkDataForPlaceholder,
} from '../../utils/render.js';

import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';

export default function Modal({ $target }) {
	const $modal = $createElement('div', '.modal-container', '.hide');
	const $modalHeader = $createElement('div', '.modal-header');
	const $modalBody = $createElement('div', '.modal-body');

	this.state = {
		id: 'new',
		title: '',
		content: '',
	};
	this.setState = nextState => {
		this.state = nextState;
	};

	new ModalHeader({
		$target: $modalHeader,
		onClick: {
			openPage: () => {
				const { id } = this.state;

				markListItemOfId(id);
				emit.readDocument({ id });
				hideModal();
			},
			closeModal: () => {
				hideModal();
			},
		},
	});

	const modalBody = new ModalBody({
		$target: $modalBody,
		onUpdate: {
			updateTitle: nextDocument => {
				const { id } = this.state;
				const { title } = nextDocument;
				const $target = $('.show-modal-title');

				setCurrentLi({ id, title });
				checkDataForPlaceholder({ $target });
				emit.updateDocument({ id, nextDocument, onModal: true });
			},
			updateContent: nextDocument => {
				const { id } = this.state;
				emit.updateDocument({ id, nextDocument, onModal: true });
			},
		},
	});

	const showModal = () => {
		modalBody.render();
		$modal.classList.remove('hide');
	};
	const hideModal = () => {
		$modal.classList.add('hide');
	};

	this.init = () => {
		$modal.appendChild($modalHeader);
		$modal.appendChild($modalBody);
		$target.appendChild($modal);

		on.showModal(showModal);
		on.updateModal(nextState => this.setState(nextState));

		window.addEventListener('click', e => {
			const createBtn = e.target.dataset.target === 'modal';
			const onModal = e.target.className.includes('modal');
			const noData =
				!$('.show-modal-title')?.textContent &&
				!$('.show-modal-content')?.value;
			const isHide = $modal.classList.contains('hide');
			const isEmpty = !onModal && !isHide && noData;

			if (createBtn || onModal) {
				return;
			}

			if (isEmpty) {
				emit.deleteEmptyDocument(this.state.id);
			}
			hideModal();
		});
	};

	this.init();
}
