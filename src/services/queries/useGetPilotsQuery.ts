import { useQuery } from "@tanstack/react-query";
import { fetchPilots } from "../api";

export const useGetPilotsQuery = (urls: string[] | undefined, name: string) => {
  const { data: pilots, isLoading: pilotsLoading, isError: pilotsError } = useQuery(
    {
      queryKey: ['pilots', name],
      queryFn: () => fetchPilots(urls || []),
      enabled: !!urls && urls.length > 0,
    }
  );

  return {
    pilots,
    pilotsLoading,
    pilotsError,
  };
};
