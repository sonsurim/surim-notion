import { $createElement } from '../../utils/templates.js';

export default function PageNoData({ $target }) {
	const $nodataPage = $createElement('div', '.nodata-page');
	const $title = $createElement('div', '.nodata-title');
	const $image = $createElement('img', '.nodata-img');
	$image.setAttribute('src', '/src/assets/images/index.png');

	this.render = () => {
		$target.innerHTML = '';
		$title.textContent = 'Notion에 오신 것을 환영합니다!';

		$nodataPage.appendChild($title);
		$nodataPage.appendChild($image);
		$target.appendChild($nodataPage);
	};
}
