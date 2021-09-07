import { emit } from '../../utils/emitter.js';
import {
	toggleList,
	markListItemOfId,
	makeNewListItemOnTree,
	makeNewListItemOnRoot,
} from '../../utils/render.js';
import { $createElement } from '../../utils/templates.js';

import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

export default function Sidebar({ $target, initialState }) {
	const $sidebar = $createElement('div', '.col', '.sidebar-container');
	const $sidebarHeader = $createElement('div', '.sidebar-header');
	const $sidebarBody = $createElement('div', '.sidebar-body');
	const $sidebarFooter = $createElement('div');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		sidebarBody.setState(this.state);
	};

	this.render = () => {
		sidebarBody.render();
	};

	new SidebarHeader({
		$target: $sidebarHeader,
	});

	const sidebarBody = new SidebarBody({
		$target: $sidebarBody,
		initialState: this.state,
		onClick: {
			toggleList: (act, $li) => {
				toggleList({ act, $li });
			},
			readDocument: id => {
				markListItemOfId(id);
				emit.readDocument({ id });
			},
			deleteDocument: (id, isCurrent) => {
				emit.deleteDocument(id, isCurrent);
			},
			createDocument: id => {
				makeNewListItemOnRoot({ needMark: true });

				emit.createDocument({ id, onModal: false });
			},
			createDocumentOnModal: (id, $li) => {
				makeNewListItemOnTree({ $target: $li });

				emit.showModal();
				emit.createDocument({ id, onModal: true });
			},
		},
	});

	new SidebarFooter({
		$target: $sidebarFooter,
		onClick: {
			createDocument: () => {
				makeNewListItemOnRoot({ needMark: false });

				emit.showModal();
				emit.createDocument({ id: null, onModal: true });
			},
		},
	});

	this.init = () => {
		$target.appendChild($sidebar);
		$sidebar.appendChild($sidebarHeader);
		$sidebar.appendChild($sidebarBody);
		$sidebar.appendChild($sidebarFooter);
	};

	this.init();
}
