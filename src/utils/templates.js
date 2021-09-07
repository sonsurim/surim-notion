import { fillListItem } from './render.js';

function $createElement(element, ...option) {
	const $element = document.createElement(element);

	if (option.length) {
		option.forEach(option => {
			const optionName = option.substring(1);

			switch (option[0]) {
				case '#':
					$element.setAttribute('id', optionName);
					break;
				default:
					$element.classList.add(optionName);
			}
		});
	}

	return $element;
}

const $hiddenTitleItem = className => {
	const $hiddenTitleInput = $createElement('div', '.hide');

	$hiddenTitleInput.setAttribute('contenteditable', true);
	$hiddenTitleInput.textContent = '제목 없음';
	addClass($hiddenTitleInput, className);

	return $hiddenTitleInput;
};

const $blankItem = () => {
	const $blank = $createElement('p', '.blank', '.hide');

	$blank.setAttribute('datat-id', 'blank');
	$blank.classList.add('hide');
	$blank.textContent = '하위 페이지가 없습니다.';

	return $blank;
};

const $treeItem = () => {
	const $tree = $createElement('ul', '.tree', '.hide');
	return $tree;
};

const $listItem = () => {
	const $li = $createElement('li');

	$li.innerHTML = `
			<p class="nav-item demo-icon">
				<span class="item-container"></span>
				<button class="nav-toggler-btn icon-play" data-act="toggle"></button>
				<span class="nav-page-title" data-act="read" ></span>
				<button class="nav-delete-btn icon-trash-empty" data-act="delete"> </button>
				<button class="nav-create-btn icon-plus-squared-alt" data-act="create" data-target="modal"></button>
			</p> `;

	return $li;
};

const $newPostListItem = () => {
	const $newLi = $listItem();
	const $filledLi = fillListItem($newLi, {
		id: 'new',
		title: '제목 없음',
		isOpened: null,
	});
	const $blank = $blankItem();

	$filledLi.appendChild($blank);
	return $filledLi;
};

export {
	$createElement,
	$hiddenTitleItem,
	$treeItem,
	$listItem,
	$blankItem,
	$newPostListItem,
};
