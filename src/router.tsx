import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Animal } from './pages/Animal/Animal';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <Home />,
				index: true,
			},
			{
				path: '/Details/:id',
				element: <Animal />,
			},
		],
	},
]);
