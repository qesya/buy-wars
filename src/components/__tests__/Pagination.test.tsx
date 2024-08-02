import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../Pagination';
import { render } from '../../utils/test-utils';
import { vi } from 'vitest';

describe('Pagination component', () => {
	// Mock functions for button handlers
	const mockOnPrevious = vi.fn();
	const mockOnNext = vi.fn();

	it('renders Previous and Next buttons correctly and handles clicks', () => {
		// Render the component with both buttons enabled
		render(
			<Pagination
				onPrevious={mockOnPrevious}
				onNext={mockOnNext}
				hasPrevious={true}
				hasNext={true}
			/>
		);

		const previousButton = screen.getAllByTestId('previous-button')[0];
		const nextButton = screen.getAllByTestId('next-button')[0];

		// Check if buttons are enabled
		expect(previousButton).not.toBeDisabled();
		expect(nextButton).not.toBeDisabled();

		// Simulate button clicks
		fireEvent.click(screen.getByText('Previous'));
		fireEvent.click(screen.getByText('Next'));

		// Check if handlers are called
		expect(mockOnPrevious).toHaveBeenCalled();
		expect(mockOnNext).toHaveBeenCalled();
	});

	it('disables Previous and Next buttons based on props', () => {
		// Render with Previous button disabled
		render(
			<Pagination
				onPrevious={mockOnPrevious}
				onNext={mockOnNext}
				hasPrevious={false}
				hasNext={true}
			/>
		);

		const previousButton = screen.getAllByTestId('previous-button')[0];
		const nextButton = screen.getAllByTestId('next-button')[0];

		// Check if Previous button is disabled
		expect(previousButton).toBeDisabled();
		expect(nextButton).not.toBeDisabled();

		// Render with Next button disabled
		render(
			<Pagination
				onPrevious={mockOnPrevious}
				onNext={mockOnNext}
				hasPrevious={true}
				hasNext={false}
			/>
		);
	});
});
