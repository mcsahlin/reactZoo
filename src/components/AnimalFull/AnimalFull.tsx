import React from 'react';
import { useState, useEffect } from 'react';
import { shouldProcessLinkClick } from 'react-router-dom/dist/dom';
import { IAnimal } from '../../models/IAnimal';
import './AnimalFull.scss';
import '../../scss/_reset.scss';
import { time } from 'console';
import { isClassLike } from 'typescript';
import { getLStorage, setLStorage } from '../../services/initData';

interface ISelectedAnimal {
	animal: IAnimal;
}

interface ISelectedAnimal {
	animal: IAnimal;
}

export const AnimalFull = (props: ISelectedAnimal) => {
	const [animals] = useState<IAnimal[]>(getLStorage());
	const {
		name,
		latinName,
		yearOfBirth,
		shortDescription,
		longDescription,
		imageUrl,
		medicine,
		isFed,
		lastFed,
	} = props.animal;
	const [loading, setLoading] = useState<boolean>(true); // Loading
	const [imgSrc, setImgSrc] = useState<string>(imageUrl); // Image source for error handling
	const [fed, setFed] = useState<boolean>(isFed); // Hunger status

	// Time
	const [threeHours] = useState<number>(10800); // Three hour mark
	const [fourHours] = useState<number>(14400); // Four hour mark
	const [timePassed, setTimePassed] = useState<number>(0); // Time passed since last feed
	const [currentTime] = useState<Date>(new Date()); // Current time
	const [timeLimit] = useState<Date>(
		new Date(currentTime.getTime() + 4 * 60 * 60 * 1000)
	); // Sets 4 hours from current time
	const [feedTime, setFeedTime] = useState<string>(lastFed);

	// Alert
	const [alert, setAlert] = useState<boolean>(false);

	// btn
	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [btnText] = useState<string>(btnDisabled ? 'Matad' : 'Mata Djur');
	const [btnClass] = useState<string>(
		btnDisabled ? 'feedAnimal feedAnimal--disabled' : 'feedAnimal'
	);

	const [hungerString] = useState<string>(fed ? 'Hungrig!' : '');
	// const btnText = btnDisabled ? 'Matad' : 'Mata Djur';
	// const btnClassName = btnDisabled
	// 	? 'feedAnimal feedAnimal--disabled'
	// 	: 'feedAnimal';
	const handleImgError = () => {
		setImgSrc('https://cdn.siasat.com/wp-content/uploads/2019/10/Missing.jpg');
	};
	// const hungerString = fed ? 'Hungrig!' : '';
	// console.log(feedTime?.getTime().toFixed);
	// Datum

	useEffect(() => {
		if (timePassed >= threeHours) {
			setBtnDisabled(false);
			setFed(true);
		}
		if (timePassed >= fourHours) {
			setAlert(true);
		}
	});

	//#region TIMER
	const startCount = () => {
		setInterval(() => {
			setTimePassed((lastCheck) => lastCheck++);
		}, 1000);
	};
	// If three / four hours has passed: set fed / notify
	useEffect(() => {
		timePassed <= threeHours && setFed(true);
		timePassed <= fourHours && setAlert(true);
	});

	useEffect(() => {
		setBtnDisabled(false);
	}, [alert]);

	// Feed button
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const updateAnimal = () => {
			setFeedTime(new Date().toString());
			setFed(true);
			const index = animals.findIndex(
				(ani) => ani.id === props.animal.id
			) as number;
			const copy = { ...animals[index] };
			copy.lastFed = feedTime;
			copy.isFed = fed;
			animals[index] = copy;
			setLStorage(animals);
		};
		updateAnimal();
		setTimePassed(0);
		setBtnDisabled(true);
		console.log('Clicked');
		console.log(timePassed);
	};

	// Loading: Initialize
	useEffect(() => {
		if (!loading) return;
		startCount();
		// setFeedTime(initRandomFeedTime());

		// const initRandomHunger = () => {
		// 	let rNum: number = Math.floor(Math.random() + 100);
		// 	rNum <= rNum / 2 ? setFed(true) : setFed(false);
		// };
		// initRandomHunger();
		setLoading(false);
	}, []);

	//

	return (
		<section className='page page--animal'>
			<div className='banner'>
				<h1 className='banner__name'>
					{name}
					<span className='alert'>{hungerString}</span>
				</h1>

				<div className='banner__year-latin-container'>
					<em className='banner__year'>Född: {yearOfBirth}</em>
					<em className='banner__latin'>Latin: {latinName}</em>
				</div>
			</div>
			<div className='imageContainer'>
				<img
					className='imageContainer__img'
					src={imgSrc}
					onError={handleImgError}
					alt={`Bild på ${name}`}
				/>
				<em className='imageContainer__caption'>{shortDescription}</em>
			</div>
			<div className='status'>
				<button
					className={btnClass}
					type='button'
					onClick={(e) => {
						handleClick(e);
					}}
					disabled={btnDisabled}
				>
					{btnText}
				</button>
				<div className='status__container'>
					<span className='status__lastfed'>
						Matad:
						<span className='status__time status__time--alert'> {lastFed}</span>
					</span>
					<span className='status__medical'>
						Medicin: <span className='status__medicine'>{medicine}</span>
					</span>
				</div>
			</div>

			<article className='info'>
				<h2 className='info__header'>Beskrivning</h2>
				<p className='info__description'>{longDescription}</p>
			</article>
			<div className='page__feed'>
				<span className='status status--good status--ok status--bad'>
					{hungerString}
				</span>
			</div>
		</section>
	);
};
