import { MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import { getLStorage } from '../../services/initData';
import './AnimalCard.scss';
import info from './../../assets/img/info.svg';
import monkey from './../../assets/img/monkey.png';

interface IAnimalProps {
	animal: IAnimal;
}

export default function Card(props: IAnimalProps) {
	const { name, shortDescription, lastFed } = props.animal;
	const [loading, setLoading] = useState<boolean>(true);
	const [currentTime] = useState<Date>(new Date());
	const [feedTime] = useState<string>(lastFed);
	const [animals, setAnimals] = useState<IAnimal[]>(getLStorage());
	const imgPath = 'srcassetsimginfo.svg';
	const parseTime = () => {};

	useState(() => {
		if (!loading) return;
	});
	// const alert =

	return (
		<article className='card'>
			<div className='card__container'>
				{/* <img
						className='card__btn'
						src={info}
					/> */}

				<div className='info'>
					<Link
						key={props.animal.id}
						to={`/Animal/${props.animal.id}`}
					>
						<h1 className='info__name'>
							{name}
							<span>alert</span>
						</h1>
					</Link>
					<p className='info__short'>{shortDescription}</p>
				</div>
			</div>
		</article>
	);
}
