import { getOpenedLiAfter } from '../store/gettersLi.js';

import {
	$createElement,
	$blankItem,
	$listItem,
	$treeItem,
	$newPostListItem,
} from './templates.js';

const drawNavList = (target, childDocuments, openedLi) => {
	childDocuments.forEach(({ id, title, documents }) => {
		const $li = $listItem();
		const haveChild = documents.length > 0;

		if (haveChild) {
			const $tree = $treeItem();

			drawNavList($tree, documents, openedLi);
			addClass($li, 'nav-header', 'tree-toggler');

			$li.appendChild($tree);
		} else {
			const $blank = $blankItem();
			$li.appendChild($blank);
		}
		const $filledList = fillListItem($li, { id, title, openedLi });
		target.appendChild($filledList);
	});
};

const makeNewListItemOnTree = ({ $target }) => {
	const $newPostLi = $newPostListItem();
	const $blank = $target.querySelector(':scope > .blank');

	if ($blank) {
		$blank.remove();

		const $tree = $createElement('ul', '.tree');
		$tree.appendChild($newPostLi);

		$target.appendChild($tree);
		addClass($target, 'nav-header', 'tree-toggler');
	} else {
		const $tree = $target.querySelector(':scope > .tree');
		$tree.appendChild($newPostLi);
	}

	toggleList({ act: 'show', $li: $target });
};

const makeNewListItemOnRoot = ({ needMark }) => {
	const $newPostLi = $newPostListItem();

	if (needMark) {
		markListItemofLi($newPostLi);
	}

	$('.root').appendChild($newPostLi);
};

const toggleList = ({ act, $li }) => {
	const { id } = $li.dataset;

	if (act === 'show') {
		getOpenedLiAfter('add', { id });

		const $hidden = $li.querySelector(':scope > .hide');
		const $toggleBtn = $li.querySelector(':scope > p .icon-play');

		removeClass($hidden, 'hide');
		replaceClass($toggleBtn, 'icon-play', 'icon-down-dir');
		return;
	}

	if (act === 'hide') {
		getOpenedLiAfter('delete', { id });

		const $needHide = $li.querySelector('.tree') || $li.querySelector('.blank');
		const $toggleBtn = $li.querySelector('.icon-down-dir');

		addClass($needHide, 'hide');
		replaceClass($toggleBtn, 'icon-down-dir', 'icon-play');
	}
};

const fillListItem = ($li, { id, title, openedLi }) => {
	const isOpenedLi = openedLi?.includes(`${id}`);

	const $nearHide = $li.querySelector('.hide');
	const $toggleBtn = $li.querySelector('.nav-toggler-btn');
	const $pageTitle = $li.querySelector('.nav-page-title');

	if (isOpenedLi) {
		removeClass($nearHide, 'hide');
		replaceClass($toggleBtn, 'icon-play', 'icon-down-dir');
	}

	$pageTitle.textContent = title ? title : '제목 없음';
	$li.setAttribute('data-id', id);
	return $li;
};

const markListItemOfId = id => {
	const $currentSelect = $('.nav-item.selected');
	const $needMark = $(`li[data-id="${id}"] p`);

	removeClass($currentSelect, 'selected');
	addClass($needMark, 'selected');
};

const markListItemofLi = $li => {
	const $currentSelect = $('.nav-item.selected');
	const $needMark = $li.querySelector('.nav-item');

	removeClass($currentSelect, 'selected');
	addClass($needMark, 'selected');
};

const setListItemToDataId = newPostId => {
	const $newPostLi = $('li[data-id="new"]');
	$newPostLi.setAttribute('data-id', newPostId);
};

const closeChildList = id => {
	const $childTreeCollection = $(`li[data-id="${id}"]`).querySelectorAll(
		'.tree-toggler .tree:not(.hide)',
	);
	const $childBlankCollection = $(`li[data-id="${id}"]`).querySelectorAll(
		'li:not(.tree-toggler) .blank:not(.hide)',
	);

	$childTreeCollection?.forEach(tree => {
		const id = tree.parentNode.dataset.id;
		getOpenedLiAfter('delete', { id });
	});

	$childBlankCollection?.forEach(blank => {
		const id = blank.parentNode.dataset.id;
		getOpenedLiAfter('delete', { id });
	});
};

const setCurrentLi = ({ id, title }) => {
	const currentLi = $(`li[data-id="${id}"] .nav-page-title`);
	currentLi.textContent = title ? title : '제목 없음';
};

const checkDataForPlaceholder = ({ $target }) => {
	const noData = $target.textContent === '';
	const $hiddenInput = $target.nextSibling;

	if (noData) {
		removeClass($hiddenInput, 'hide');
	} else {
		addClass($hiddenInput, 'hide');
	}
};

const setPlaceholderTitle = ({ $target, title }) => {
	if (!title) {
		removeClass($target, 'hide');
	} else {
		addClass($target, 'hide');
	}
};

export {
	drawNavList,
	makeNewListItemOnTree,
	makeNewListItemOnRoot,
	fillListItem,
	setListItemToDataId,
	markListItemOfId,
	markListItemofLi,
	toggleList,
	closeChildList,
	setCurrentLi,
	setPlaceholderTitle,
	checkDataForPlaceholder,
};
