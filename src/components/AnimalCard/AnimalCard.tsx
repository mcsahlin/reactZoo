import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';

interface IAnimalProps {
	animal: IAnimal;
}

export default function Card(props: IAnimalProps) {
	const { id, imageUrl, name, shortDescription } = props.animal;
	const route = useNavigate();
	const handleClick = (e: MouseEvent) => {
		route(`/details/${id}`);
	};
	return (
		<>
			<Link to={`/details/${id}`}>
				<div
					className='card'
					onClick={(e) => handleClick(e)}
				>
					<img
						className='card__img'
						src={imageUrl}
					/>
					<h1 className='card__name'>{name}</h1>
					<p className='card__short'>{shortDescription}</p>
				</div>
			</Link>
		</>
	);
}
