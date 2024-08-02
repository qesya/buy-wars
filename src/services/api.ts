import axios from 'axios';
import { Film, People, Starship, StarshipResponse } from './types';

export const fetchStarShip = async (url: string = 'https://swapi.dev/api/starships/'): Promise<StarshipResponse> => {
  try {
    const response = await axios.get<StarshipResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching starships:', error);
    throw new Error('Failed to fetch starships');
  }
};

export const fetchStarshipByUrl = async (url: string): Promise<Starship> => {
  try {
    const response = await axios.get<Starship>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching starship details:', error);
    throw new Error('Failed to fetch starship details');
  }
};

export const fetchPilots = async (urls: string[]): Promise<People[]> => {
  return fetchMultiple(urls);
};

export const fetchFilms = async (urls: string[]): Promise<Film[]> => {
  return fetchMultiple(urls);
};

export const fetchMultiple = async <T>(urls: string[]): Promise<T[]> => {
  try {
    const responses = await Promise.all(urls.map(url => axios.get<T>(url)));
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching details:', error);
    throw new Error('Failed to fetch details');
  }
};
