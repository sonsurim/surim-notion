import { $createElement } from '../../utils/templates.js';

export default function SidebarHeader({ $target }) {
	const $headerTitlte = $createElement('div', '.header-title');
	$headerTitlte.textContent = 'π μμλ¦Όμ notion';

	$target.appendChild($headerTitlte);
}
