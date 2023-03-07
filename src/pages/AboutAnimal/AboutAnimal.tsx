import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AnimalFull } from '../../components/AnimalFull/AnimalFull';
import { IAnimal } from '../../models/IAnimal';
import { getLStorage } from '../../services/initData';

interface ISelectedAnimal extends IAnimal {}
export const AboutAnimal = () => {
	const [animals, setAnimals] = useState<IAnimal[]>(getLStorage());
	const [loading, setLoading] = useState<boolean>(true);
	const { id } = useParams<{ id: string }>();
	const selectedAnimal: ISelectedAnimal = animals.find(
		(animal) => animal.id === Number(id)
	) as IAnimal;

	useEffect(() => {
		if (!loading) return;
		setAnimals(getLStorage());
		setLoading(false);
	}, []);
	return (
		<AnimalFull
			selected={selectedAnimal}
			list={animals}
		/>
	);
};
