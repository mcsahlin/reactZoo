import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Cards from './components/cards/cards';
import Details from './components/details/details';
import NotFound from './components/404/NotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/Details',
				element: <Details />,
			},
			{
				path: '/',
				element: <Cards />,
				index: true,
			},
		],
	},
]);
