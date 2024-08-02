import { useQuery } from "@tanstack/react-query";
import { fetchStarshipByUrl } from "../api";

export const useGetStarshipQuery = (url: string, name: string) => {
  const { data: starship, isLoading: starshipLoading, isError: starshipError } = useQuery(
    {
      queryKey: ['starship', name],
      queryFn: () => fetchStarshipByUrl(url),
      enabled: url.length > 0
    }
  );

  return {
    starship,
    starshipLoading,
    starshipError,
  }
}