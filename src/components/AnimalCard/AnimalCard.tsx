import { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import './AnimalCard.scss';

interface IAnimalProps {
	animal: IAnimal;
}

export default function Card(props: IAnimalProps) {
	const { name, shortDescription, lastFed } = props.animal;
	const [loading, setLoading] = useState<boolean>(true);
	const [currentTime] = useState<Date>(new Date());
	const [feedTime] = useState<string>(lastFed);

	const parseTime = () => {};

	useState(() => {
		if (loading) return;
	});
	// const alert =

	return (
		<article className='card'>
			<div className='info'>
				<h1 className='info__name'>
					{name}
					<span>alert</span>
				</h1>
				<p className='info__short'>{shortDescription}</p>
			</div>
		</article>
	);
}
