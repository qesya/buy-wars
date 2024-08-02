import { queryOptions } from '@tanstack/react-query';
import { StarshipResponse } from '../types';
import { fetchStarShip } from '../api';

export const starshipsQueryOptions = (url: string) => queryOptions<StarshipResponse>({
  queryKey: ['starships', url],
  queryFn: () => fetchStarShip(url),
});
