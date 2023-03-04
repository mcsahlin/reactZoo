import { useEffect, useState } from 'react';
import './App.scss';
import { IAnimal } from './models/IAnimal';
import { setLStorage, getLStorage, apiCall } from './services/initData';
import { Outlet } from 'react-router-dom';

const App = () => {
	const [animals, setAnimals] = useState<IAnimal[]>([]);
	const [initialized, setInitialized] = useState<boolean>(false);

	useEffect(() => {
		if (animals.length > 0) return;
		const setData = async () => {
			setLStorage(await apiCall());
		};
		setData().then(() => {
			setInitialized(true);
		});
	}, []);

	useEffect(() => {
		setAnimals(getLStorage());
	}, [initialized]);

	return (
		<main>
			<Outlet />
		</main>
	);
};

export default App;
