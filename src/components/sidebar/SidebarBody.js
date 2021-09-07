import { $createElement } from '../../utils/templates.js';

import { drawNavList, markListItemOfId } from '../../utils/render.js';
import { getOpenedLiAfter } from '../../store/gettersLi.js';

export default function SidebarBody({ $target, initialState, onClick }) {
	const $navContainer = $createElement('div', '.nav-container');
	const $navRow = $createElement('div', '.list-row');
	const $navList = $createElement('div', '.nav-list');
	const $ul = $createElement('ul', '.root');
	const $createBtn = $createElement('div', '.create-btn');
	$createBtn.innerHTML = `<span data-target="page">+ 페이지 추가</span>`;

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	this.render = () => {
		const { documents, currentDocument } = this.state;
		const $selected = $('p.selected');

		const openedLi = getOpenedLiAfter('fetch');

		$ul.innerHTML = '';
		drawNavList($ul, documents, openedLi);

		removeClass($selected, 'selected');
		markListItemOfId(currentDocument.id);
	};

	this.init = () => {
		$navList.appendChild($ul);
		$navRow.appendChild($navList);
		$navContainer.appendChild($navRow);
		$navContainer.appendChild($createBtn);
		$target.appendChild($navContainer);

		$createBtn.addEventListener('click', e => {
			onClick.createDocument(null, null);
		});

		$navList.addEventListener('mouseover', e => {
			const currentTarget = e.target.parentNode;

			const $needRemoveCollection = document.querySelectorAll('.show');
			const $deleteBtn = currentTarget.querySelector('.nav-delete-btn');
			const $createBtn = currentTarget.querySelector('.nav-create-btn');

			removeClassAll($needRemoveCollection, 'show');

			if (currentTarget.tagName !== 'LI') {
				addClass($deleteBtn, 'show');
				addClass($createBtn, 'show');
			}
		});

		$navList.addEventListener('mouseout', e => {
			const $needRemoveCollection = document.querySelectorAll('.show');
			removeClassAll($needRemoveCollection, 'show');
		});

		$ul.addEventListener('click', e => {
			const { tagName, className, parentNode } = e.target;

			const $li = parentNode.parentNode;
			const { id } = $li.dataset;
			const { act } = e.target.dataset;

			if (tagName === 'LI' || className.includes('blank')) {
				return;
			}

			switch (act) {
				case 'toggle':
					const isOpened = className.includes('icon-down-dir');

					if (isOpened) {
						onClick.toggleList('hide', $li);
					} else {
						onClick.toggleList('show', $li);
					}
					break;
				case 'create':
					const onModal = !!id;

					if (onModal) {
						onClick.createDocumentOnModal(id, $li);
					} else {
						onClick.createDocument($li);
					}
					break;
				case 'delete':
					const isCurrent = Number(id) === this.state.currentDocument.id;
					onClick.deleteDocument(id, isCurrent);
					break;
				default:
					onClick.readDocument(id);
					break;
			}
		});
	};

	this.init();
}
