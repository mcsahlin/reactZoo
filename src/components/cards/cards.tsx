import { useState } from 'react';
import { IAnimal } from '../../models/IAnimal';
import { getLStorage } from '../../services/initData';
import Card from '../card/Card';

export default function Cards() {
	const [animals, setAnimals] = useState<IAnimal[]>(getLStorage());
	const html = animals.map((animal) => {
		return (
			<Card
				id={animal.id}
				img={animal.imageUrl}
				name={animal.name}
				short={animal.shortDescription}
			/>
		);
	});
	return <>{html}</>;
}
