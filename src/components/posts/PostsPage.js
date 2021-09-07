import { emit } from '../../utils/emitter.js';
import { $createElement } from '../../utils/templates.js';
import { setCurrentLi, checkDataForPlaceholder } from '../../utils/render.js';

import PageNoData from './PostsPageNoData.js';
import PageBody from './PostsPageBody.js';

export default function Page({ $target, initialState }) {
	const $page = $createElement('div', '.col', '.page-container');
	const $pageBody = $createElement('div', '.page-body');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		pageBody.setState(this.state);
	};

	this.render = () => {
		const haveData = Object.keys(this.state.currentDocument).length > 0;

		if (haveData) {
			pageBody.render();
		} else {
			noDataPage.render();
		}
	};

	const noDataPage = new PageNoData({ $target: $pageBody });

	const pageBody = new PageBody({
		$target: $pageBody,
		initialState,
		onUpdate: {
			updateTitle: nextDocument => {
				const { id } = this.state.currentDocument;
				const { title } = nextDocument;
				const $target = $('.show-page-title');

				setCurrentLi({ id, title });
				checkDataForPlaceholder({ $target });
				emit.updateDocument({ id, nextDocument, onModal: false });
			},
			updateContent: nextDocument => {
				const { id } = this.state.currentDocument;

				emit.updateDocument({ id, nextDocument, onModal: false });
			},
		},
	});

	$target.appendChild($page);
	$page.appendChild($pageBody);
}
