import { useState, useEffect } from 'react';
import { IAnimal } from '../../models/IAnimal';
import { getLStorage } from '../../services/initData';
import Card from '../card/Card';

export default function Cards() {
	const [animals, setAnimals] = useState<IAnimal[]>(getLStorage());
	useEffect(() => {
		if (animals.length > 0) return;
		setAnimals(getLStorage());
	}, []);

	return animals.map((animal) => {
		return (
			<Card
				key={animal.id}
				animal={animal}
			/>
		);
	});
}
