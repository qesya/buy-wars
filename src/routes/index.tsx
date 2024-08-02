import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { starshipsQueryOptions } from '../services/queries/starshipsQuery';
import Product from '../components/Product';
import Pagination from '../components/Pagination';

export const Route = createFileRoute('/')({
  component: Index,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(starshipsQueryOptions('https://swapi.dev/api/starships/')),
});

function Index() {
  const [url, setUrl] = useState<string>('https://swapi.dev/api/starships/');

  const { data: starshipsResponse } = useSuspenseQuery(starshipsQueryOptions(url));

  const hasPrevious = url !== 'https://swapi.dev/api/starships/' && !!starshipsResponse.previous;
  const hasNext = !!starshipsResponse.next;

  const handleNextPage = () => {
    if (starshipsResponse.next) {
      setUrl(starshipsResponse.next);
    }
  };

  const handlePreviousPage = () => {
    if (starshipsResponse.previous) {
      setUrl(starshipsResponse.previous);
    }
  };

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-4">
          {starshipsResponse.results.map(starship => (
            <Product key={starship.name} starship={starship} />
          ))}
        </div>
        <Pagination
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
        />
      </div>
    </div>
  );
};

export default Index;
