import React from 'react';
import { useState, useEffect } from 'react';
import { IAnimal } from '../../models/IAnimal';
import './AnimalFull.scss';
import '../../scss/_reset.scss';
import { getLStorage, setLStorage } from '../../services/initData';

interface ISelectedAnimal {
	list: IAnimal[];
	selected: IAnimal;
}

export const AnimalFull = (props: ISelectedAnimal) => {
	const [animals, setAnimals] = useState<IAnimal[]>(getLStorage());
	const [animal] = useState<IAnimal>(animals[props.selected.id - 1]);
	const {
		imageUrl,
		isFed,
		lastFed,
		longDescription,
		medicine,
		name,
		yearOfBirth,
		latinName,
		shortDescription,
	} = animal;
	const [loading, setLoading] = useState<boolean>(true); // Loading
	// Animal dynamic states
	const [imgSrc, setImgSrc] = useState<string>(imageUrl); // Image source for error handling
	const [fed, setFed] = useState<boolean>(isFed); // Hunger status
	const [timeFed, setTimeFed] = useState<string>(lastFed);
	// Time
	const [threeHours] = useState<number>(10800); // Three hour mark
	const [fourHours] = useState<number>(14400); // Four hour mark
	const [timePassed, setTimePassed] = useState<number>(0); // Time passed since last feed
	const [currentTime, setCurrentTime] = useState<Date>(new Date()); // Current time
	const [timeLimit] = useState<Date>(
		new Date(currentTime.getTime() + 4 * 60 * 60 * 1000)
	); // Sets 4 hours from current time

	// Alert
	const [alert, setAlert] = useState<boolean>(fed && false);

	// btn
	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
	const [btnText, setBtnText] = useState<string>(
		btnDisabled ? 'Matad' : 'Mata Djur'
	);
	const [btnClass, setBtnClass] = useState<string>(
		btnDisabled ? 'feedAnimal feedAnimal--disabled' : 'feedAnimal'
	);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [update, setUpdate] = useState<boolean>(false);

	const [hungerString] = useState<string>(!fed ? 'Hungrig!' : '');

	const handleImgError = () => {
		setImgSrc('https://cdn.siasat.com/wp-content/uploads/2019/10/Missing.jpg');
	};

	useEffect(() => {
		if (!loading) return;
		startCount();
		console.log('test');
		setLoading(false);
	}, []);

	//#region TIMER
	const startCount = () => {
		setInterval(() => {
			setTimePassed((lastCheck) => lastCheck + 1);
		}, 1000);
	};

	const updateBtn = () => {
		setBtnDisabled(true);
		setBtnClass('feedAnimal feedAnimal--disabled');
		setBtnText('Matad');
	};
	// Feed button
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		updateBtn();
		const updateAnimal = () => {
			const newTime = new Date().toISOString();
			const index = animals.findIndex((ani) => ani === animal) as number;
			const copy = { ...animals[index] };
			copy.lastFed = newTime;
			copy.isFed = true;
			animals[index] = copy;
			setLStorage(animals);
			setAnimals(getLStorage());
		};
		updateAnimal();
		setRefresh(!refresh);
		setUpdate(true);
	};

	useEffect(() => {
		setFed(true);
		setTimeFed(new Date().toISOString().toString());
		setTimePassed(0);
		setAlert(false);
		const updateStorage = () => {
			const temp = [...animals];
			const index = temp.findIndex((animal) => props.selected.id === animal.id);
			temp[index].lastFed = timeFed;
			temp[index].isFed = fed;
			setLStorage(temp);
			setLoading(true);
		};
		updateStorage();
		return setUpdate(false);
	}, [update]);

	// Loading: Initialize

	//

	useEffect(() => {
		if (loading) {
			setAnimals(getLStorage());
			isFed && updateBtn();
		}
		return setLoading(false);
	}, [loading]);

	return (
		<section className='page page--animal'>
			<div className='banner'>
				<h1 className='banner__name'>
					{name}
					{!refresh && <span className='alert'>{hungerString}</span>}
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
				<div className='status__container'>
					<span className='status__lastfed'>
						Matad:
						<span className='status__time status__time--alert'> {lastFed}</span>
					</span>
					<span className='status__medical'>
						Medicin: <span className='status__medicine'>{medicine}</span>
					</span>
				</div>
				<button
					className={btnClass}
					type='button'
					onClick={(e) => handleClick(e)}
					disabled={btnDisabled}
				>
					{btnText}
				</button>
			</div>

			<article className='info'>
				<h2 className='info__header'>Beskrivning</h2>
				<p className='info__description'>{longDescription}</p>
			</article>
		</section>
	);
};
