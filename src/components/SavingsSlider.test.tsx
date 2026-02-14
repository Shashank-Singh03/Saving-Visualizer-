import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SavingsSlider } from '../components/SavingsSlider';

describe('SavingsSlider', () => {
    it('renders with initial value', () => {
        render(<SavingsSlider value={100} onChange={() => { }} />);

        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    });

    it('displays daily, monthly, and yearly breakdown', () => {
        render(<SavingsSlider value={100} onChange={() => { }} />);

        const monthlyAmount = Math.round(100 * 30);
        const yearlyAmount = Math.round(100 * 365);

        expect(screen.getByText(`≈ ₹${monthlyAmount.toLocaleString('en-IN')}/month`)).toBeInTheDocument();
        expect(screen.getByText(`≈ ₹${yearlyAmount.toLocaleString('en-IN')}/year`)).toBeInTheDocument();
    });

    it('has proper ARIA labels', () => {
        render(<SavingsSlider value={100} onChange={() => { }} />);

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('aria-label', 'Daily savings amount');
        expect(slider).toHaveAttribute('aria-valuenow', '100');
    });
});
