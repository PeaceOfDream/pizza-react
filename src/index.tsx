import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { store } from './redux/store';
import { Provider } from 'react-redux';

const rootElem = document.getElementById('root');



	const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement
	);
	root.render(
	  <Provider store={store}>
			<BrowserRouter basename='/pizza-react'>
		
			  <App />
		 
			</BrowserRouter>
	  </Provider>,
	);


