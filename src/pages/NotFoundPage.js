import { $createElement } from '../utils/templates.js';

export default function NotFoundPage({ $target }) {
	const $page = $createElement('div', '.not-found');

	const $title = $createElement('h1', '.not-fount-title');
	$title.textContent = '길을 잃었어요..🥺';

	const $image = $createElement('img', '.not-found-img');
	$image.setAttribute('src', '/src/assets/images/404.png');

	this.render = () => {
		$target.innerHTML = '';

		$page.appendChild($title);
		$page.appendChild($image);
		$target.appendChild($page);
	};

	this.init = () => {
		$title.addEventListener('click', e => {
			window.location = window.location.origin;
		});

		$image.addEventListener('click', e => {
			window.location = window.location.origin;
		});
	};

	this.init();
}
