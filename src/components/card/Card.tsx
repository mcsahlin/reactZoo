import React from 'react';

interface ICardProps {
	key: number;
	img: string;
	name: string;
	short: string;
}

export default function Card(props: ICardProps) {
	return (
		<div
			className='cards__card'
			key={props.key}
		>
			<img
				className='cards__img'
				src={props.img}
			/>
			<h1 className='cards__name'>{props.name}</h1>
			<p className='cards__intro'>{props.short}</p>
		</div>
	);
}
