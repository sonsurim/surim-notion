import { $createElement } from '../../utils/templates.js';

export default function SidebarHeader({ $target }) {
	const $headerTitlte = $createElement('div', '.header-title');
	$headerTitlte.textContent = '😎 손수림의 notion';

	$target.appendChild($headerTitlte);
}
