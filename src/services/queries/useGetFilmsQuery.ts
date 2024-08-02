import { useQuery } from "@tanstack/react-query";
import { fetchFilms } from "../api";

export const useGetFilmsQuery = (urls: string[] | undefined, name: string) => {
  const { data: films, isLoading: filmsLoading, isError: filmsError } = useQuery(
    {
      queryKey: ['films', name],
      queryFn: () => fetchFilms(urls || []),
      enabled: !!urls && urls.length > 0,
    }
  );

  return {
    films,
    filmsLoading,
    filmsError,
  };
};
