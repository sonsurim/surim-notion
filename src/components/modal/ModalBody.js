import { $createElement, $hiddenTitleItem } from '../../utils/templates.js';
import { setPlaceholderTitle } from '../../utils/render.js';

export default function ModalBody({ $target, onUpdate }) {
	const $modalTitle = $createElement('p', '.modal-title');
	const $modalContent = $createElement('p', '.modal-content');

	const $hiddenTitleInput = $hiddenTitleItem('hidden-modal-title');
	const $titleInput = $createElement('div', '.show-modal-title');
	$titleInput.setAttribute('contenteditable', true);

	const $contentInput = $createElement('textarea', '.show-modal-content');
	$contentInput.setAttribute('placeholder', '문서의 내용을 입력해보세요!');

	this.render = () => {
		$titleInput.textContent = '';
		$contentInput.value = '';
		setPlaceholderTitle({ $target: $hiddenTitleInput, title: null });
	};

	this.init = () => {
		this.render();

		$modalTitle.appendChild($titleInput);
		$modalTitle.appendChild($hiddenTitleInput);
		$modalContent.appendChild($contentInput);
		$target.appendChild($modalTitle);
		$target.appendChild($modalContent);

		$titleInput.addEventListener('keyup', e => {
			const title = e.target.textContent;
			const content = $contentInput.value;

			const nextDocument = { title, content };
			onUpdate.updateTitle(nextDocument);
		});

		$contentInput.addEventListener('keyup', e => {
			const title = $titleInput.textContent;
			const content = e.target.value;

			const nextDocument = { title, content };
			onUpdate.updateContent(nextDocument);
		});
	};

	this.init();
}
