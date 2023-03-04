import { useState, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface ICardProps {
	id: number;
	img: string;
	name: string;
	short: string;
}

export default function Card(props: ICardProps) {
	const [id, setId] = useState<number>(props.id);
	const route = useNavigate();
	const handleClick = (e: MouseEvent) => {
		route(`/details/${props.id}`);
	};
	return (
		<Link to={`/details/${id}`}>
			<div
				className='card'
				onClick={(e) => handleClick(e)}
			>
				<img
					className='card__img'
					src={props.img}
				/>
				<h1 className='card__name'>{props.name}</h1>
				<p className='card__short'>{props.short}</p>
			</div>
		</Link>
	);
}
