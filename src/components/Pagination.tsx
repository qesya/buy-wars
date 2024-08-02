import { Button } from '@carbon/react';
import { ChevronRight, ChevronLeft } from '@carbon/icons-react';
import '../App.css';

interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ onPrevious, onNext, hasPrevious, hasNext }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
        <Button
          renderIcon={ChevronLeft}
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="quantity-button"
          data-testid="previous-button"
        >
          Previous
        </Button>
        <Button
          renderIcon={ChevronRight}
          onClick={onNext}
          disabled={!hasNext}
          className="quantity-button"
          data-testid="next-button"
        >
          Next
        </Button>
    </div>
  );
};

export default Pagination;
