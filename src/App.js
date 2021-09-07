import { on } from './utils/emitter.js';
import { getStateAfter } from './store/gettersState.js';

import Store from './store/index.js';
import NotFoundPage from './pages/NotFoundPage.js';
import MainPage from './pages/MainPage.js';

export default function App({ $target }) {
	this.init = async () => {
		new Store();

		const notFoundPage = new NotFoundPage({ $target });
		const mainpage = new MainPage({ $target, initialState: {} });

		this.setState = ({ nextState, needRender }) => {
			this.state = nextState;
			mainpage.setState({ nextState, needRender });
		};

		this.route = async () => {
			const { pathname } = window.location;

			if (pathname === '/404') {
				notFoundPage.render();
				return;
			}

			const nextState = await getStateAfter('fetch');
			this.setState({ nextState, needRender: 'all' });
		};
		this.route();

		on.initStore((nextState, needRender) =>
			this.setState({ nextState, needRender }),
		);
		on.initRouter(() => this.route());
	};

	this.init();
}
