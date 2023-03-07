import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import { apiCall, getLStorage, setLStorage } from '../../services/initData';
import Card from '../../components/AnimalCard/AnimalCard';

export const AnimalList = () => {
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

	const html = animals.map((animal) => {
		return (
			<Link
				key={animal.id}
				to={`/Animal/${animal.id}`}
			>
				<Card animal={animal} />
			</Link>
		);
	});

	return <>{html}</>;
};
