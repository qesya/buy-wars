import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useGetStarshipQuery } from '../../services/queries/useGetStarshipQuery';
import StarshipModal from '../StarshipModal';
import { useGetPilotsQuery } from '../../services/queries/useGetPilotsQuery';
import { useGetFilmsQuery } from '../../services/queries/useGetFilmsQuery';

// Mock the data fetching hooks
vi.mock('../../services/queries/useGetStarshipQuery', () => ({
  useGetStarshipQuery: vi.fn(),
}));

vi.mock('../../services/queries/useGetPilotsQuery', () => ({
  useGetPilotsQuery: vi.fn(),
}));

vi.mock('../../services/queries/useGetFilmsQuery', () => ({
  useGetFilmsQuery: vi.fn(),
}));

// Mock the starship images
vi.mock('../../services/starshipsImages', () => ({
  StarShipImage: [{ name: 'Test Starship', url: 'http://test.com/image.jpg' }],
}));

describe('StarshipModal component', () => {
  const mockOnClose = vi.fn();
  const mockOnBuy = vi.fn();

  it('renders correctly when open and displays data', async () => {
    // Mocking the hooks
    (useGetStarshipQuery as Mock).mockReturnValue({
      starship: {
        name: 'Test Starship',
        model: 'Model X',
        manufacturer: 'Manufacturer Y',
        cost_in_credits: '1000',
        length: '30m',
        max_atmosphering_speed: '1000km/h',
        crew: '5',
        passengers: '2',
        cargo_capacity: '5000kg',
        consumables: '1 month',
        hyperdrive_rating: '1.0',
        MGLT: '50',
        starship_class: 'Fighter',
        pilots: [],  // Mock pilots
        films: []    // Mock films
      },
      starshipLoading: false,
      starshipError: null,
    });

    (useGetPilotsQuery as Mock).mockReturnValue({
      pilots: [],
      pilotsLoading: false,
      pilotsError: null,
    });

    (useGetFilmsQuery as Mock).mockReturnValue({
      films: [],
      filmsLoading: false,
      filmsError: null,
    });

    render(
      <StarshipModal
        isOpen={true}
        onClose={mockOnClose}
        starshipUrl="http://test.com/starship"
        onBuy={mockOnBuy}
        starshipName="Test Starship"
      />
    );

    // Assertions
    expect(screen.getAllByText('Test Starship')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Model:')[0]).toHaveTextContent('Model X');
    expect(screen.getAllByAltText('Test Starship')[0]).toHaveAttribute('src', 'http://test.com/image.jpg');
  });

  it('displays loading state correctly', () => {
    (useGetStarshipQuery as Mock).mockReturnValue({
      starship: null,
      starshipLoading: true,
      starshipError: null,
    });

    render(
      <StarshipModal
        isOpen={true}
        onClose={mockOnClose}
        starshipUrl="http://test.com/starship"
        onBuy={mockOnBuy}
        starshipName="Test Starship"
      />
    );

    expect(screen.getAllByRole('status')[0]).toBeInTheDocument(); // Assuming the loading spinner has a role "status"
  });

  it('displays error state correctly', () => {
    (useGetStarshipQuery as Mock).mockReturnValue({
      starship: null,
      starshipLoading: false,
      starshipError: new Error('Failed to fetch'),
    });

    render(
      <StarshipModal
        isOpen={true}
        onClose={mockOnClose}
        starshipUrl="http://test.com/starship"
        onBuy={mockOnBuy}
        starshipName="Test Starship"
      />
    );

    expect(screen.getAllByText('Error loading details.')[0]).toBeInTheDocument();
  });
});
