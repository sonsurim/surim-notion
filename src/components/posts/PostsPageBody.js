import { $createElement, $hiddenTitleItem } from '../../utils/templates.js';
import { setPlaceholderTitle } from '../../utils/render.js';

export default function PageBody({ $target, initialState, onUpdate }) {
	const $pageTitle = $createElement('div', '.page-title');
	const $pageContent = $createElement('div', '.page-content');

	const $hiddenTitleInput = $hiddenTitleItem('hidden-page-title');
	const $titleInput = $createElement('div', '.show-page-title');
	$titleInput.setAttribute('contenteditable', true);

	const $contentInput = $createElement('textarea', '.show-page-content');
	$contentInput.setAttribute('placeholder', '문서의 내용을 입력해보세요!');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	this.render = () => {
		$target.innerHTML = '';

		$pageTitle.appendChild($titleInput);
		$pageTitle.appendChild($hiddenTitleInput);
		$pageContent.appendChild($contentInput);
		$target.appendChild($pageTitle);
		$target.appendChild($pageContent);

		const { title, content } = this.state.currentDocument;

		$titleInput.textContent = title;
		$contentInput.value = content ? content : '';

		setPlaceholderTitle({ $target: $hiddenTitleInput, title });
	};

	this.init = () => {
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
