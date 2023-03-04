import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card/Card';
import { IAnimal } from './models/IAnimal';
import { setLStorage, getLStorage, apiCall } from './services/initData';

interface IAnimalProps {
	img: string;
	name: string;
	short: string;
}

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
		setAnimals(getLStorage);
	}, [initialized]);

	return (
		<main className='cards'>
			{animals.map((animal) => {
				return (
					<Card
						key={animal.id}
						img={animal.imageUrl}
						name={animal.name}
						short={animal.shortDescription}
					/>
				);
			})}
		</main>
	);
};

export default App;
