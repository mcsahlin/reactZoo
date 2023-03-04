import axios, { AxiosResponse } from 'axios';
import { IAnimals } from '../models/IAnimals';

// Assign API URL to constant
const API_URL = 'https://animals.azurewebsites.net/api/animals';

export async function apiCall(): Promise<IAnimals[]> {
	const response: AxiosResponse<IAnimals[]> = await axios.get(API_URL);
	return response.data;
}

export function setLStorage(list: IAnimals[]) {
	localStorage.setItem('animals', JSON.stringify(list));
}

export function getLStorage(): IAnimals[] {
	return JSON.parse(localStorage.getItem('animals' as string) || '');
}
