import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AnimalFull } from '../../components/AnimalFull/AnimalFull';
import { IAnimal } from '../../models/IAnimal';
import { getLStorage } from '../../services/initData';

interface ISelectedAnimal extends IAnimal {}
export const AboutAnimal = () => {
	const [animals] = useState<IAnimal[]>(getLStorage());
	const { id } = useParams<{ id: string }>();
	const selectedAnimal: ISelectedAnimal = animals.find(
		(animal) => animal.id === Number(id)
	) as IAnimal;

	return <AnimalFull animal={selectedAnimal} />;
};
