import { screen } from '@testing-library/react';
import Product from '../Product';
import { Starship } from '../../services/types';
import { render } from '../../utils/test-utils';
import '@testing-library/jest-dom';

const mockStarship: Starship = {
	name: 'X-Wing',
	model: 'T-65 X-wing',
	manufacturer: 'Incom T-65',
	cost_in_credits: '150000',
	length: '12.5',
	max_atmosphering_speed: '1050',
	crew: '1',
	passengers: '0',
	cargo_capacity: '110',
	consumables: '1 week',
	hyperdrive_rating: '1.0',
	MGLT: '75',
	starship_class: 'Starfighter',
	pilots: [],
	films: [],
	created: '',
	edited: '',
	url: '',
};

describe('Product component', () => {
	test('renders Product component correctly', () => {
		render(<Product starship={mockStarship} />);

		expect(screen.getByText('X-Wing')).toBeInTheDocument();
		expect(screen.getByText('Model: T-65 X-wing')).toBeInTheDocument();
		expect(screen.getByText('Manufacturer: Incom T-65')).toBeInTheDocument();
		expect(screen.getByText('Cost: 150000 credits')).toBeInTheDocument();
	});
});
