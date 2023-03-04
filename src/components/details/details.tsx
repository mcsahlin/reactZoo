import { TimeLike } from 'fs';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IAnimal } from '../../models/IAnimal';
import { getLStorage } from '../../services/initData';

interface IPresentationProps extends IAnimal {}

interface TimerState {
	value: number;
	isLessThan50: boolean;
}

export function details(props: IPresentationProps) {
	const [loading, setLoading] = useState<boolean>(true);
	const [animals, setAnimals] = useState<IAnimal[]>([]);
	const [animal, setAnimal] = useState<IAnimal>();
	const [hunger, setHunger] = useState<boolean>(false);
	const [lastFed, setLastFed] = useState<string>(Date.toString());
	const [timer, setTimer] = useState<TimerState>({
		value: 100,
		isLessThan50: false,
	});
	const hungerString = () => {
		if (hunger) {
			return 'Hungry!';
		} else {
			return 'Happy!';
		}
	};
	const { idParam } = useParams();

	useEffect(() => {
		if (!loading) return;
		setAnimals(getLStorage());
		animals.map((animal) => {
			(err: Error) =>
				animal.id.toString() === idParam
					? setAnimal(animal)
					: console.log(`Error matching obj to param: ${err}`);
		});
	}, [loading]);

	useEffect(() => {
		let rNum: number = Math.floor(Math.random() + 100);
		rNum <= rNum / 2 ? setHunger(true) : setHunger(false);
		setLoading(false);
	}, [animal]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimer((preState) => {
				const newValue = preState.value - 100 / (8 * 60 * 60);
				const newIsLessThan50 =
					preState.isLessThan50 || (preState.value > 50 && newValue <= 50); // set isLessThan50 to true when value is <= 50
				return { value: newValue, isLessThan50: newIsLessThan50 };
			});
		}, 1000);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		timer.isLessThan50 && setHunger(true);
	}, [timer]);

	return (
		<div className='anipage'>
			<h2>{animal?.name}</h2>
			<p>{animal?.yearOfBirth}</p>
			<img
				src={animal?.imageUrl}
				alt={`Image of a ${animal?.latinName} from a really good angle`}
			/>
			<p>{animal?.longDescription}</p>
			<div className='anipage__foodbox'>
				<span className='status status--good status--ok status--bad'>
					{hungerString()}
				</span>
				<button
					type='button'
					onClick={() => {
						setHunger(false);
						timer;
						setLastFed(Date.now.toString());
					}}
				></button>
			</div>
		</div>
	);
}

export default details;
