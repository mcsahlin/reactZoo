import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import { apiCall, getLStorage, setLStorage } from '../../services/initData';
import Card from '../../components/AnimalCard/AnimalCard';
import './AnimalList.scss';
import monkey from './../../assets/img/monkey.png';

export const AnimalList = () => {
	const [animals, setAnimals] = useState<IAnimal[]>(getLStorage());
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
			// <Link
			// 	key={animal.id}
			// 	to={`/Animal/${animal.id}`}
			// >
			<Card key={animal.id} animal={animal} />
			// {/* </Link> */}
		);
	});

	return (
		<div className='AnimalList'>
			{/* <aside className='AnimalList__sidebar'></aside> */}
			<section className='AnimalList__cards'>
				<div className='AnimalList__shelf'>
					<img src={monkey} />
				</div>
				<div className='space'></div>
				{html}
			</section>
		</div>
	);
};
