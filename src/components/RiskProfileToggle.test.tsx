import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RiskProfileToggle } from '../components/RiskProfileToggle';

describe('RiskProfileToggle', () => {
    it('renders all three risk profiles', () => {
        render(<RiskProfileToggle value="BALANCED" onChange={() => { }} />);

        expect(screen.getByText('Safe')).toBeInTheDocument();
        expect(screen.getByText('Balanced')).toBeInTheDocument();
        expect(screen.getByText('Growth')).toBeInTheDocument();
    });

    it('marks selected profile as active', () => {
        render(<RiskProfileToggle value="GROWTH" onChange={() => { }} />);

        const growthButton = screen.getByRole('button', { name: /Growth risk profile/ });
        expect(growthButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('calls onChange when profile is clicked', () => {
        let selectedProfile = 'BALANCED';
        const handleChange = (profile: any) => {
            selectedProfile = profile;
        };

        render(<RiskProfileToggle value="BALANCED" onChange={handleChange} />);

        const safeButton = screen.getByRole('button', { name: /Safe risk profile/ });
        fireEvent.click(safeButton);

        expect(selectedProfile).toBe('SAFE');
    });

    it('has proper keyboard navigation', () => {
        render(<RiskProfileToggle value="BALANCED" onChange={() => { }} />);

        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
            expect(button).toHaveAttribute('type', 'button');
        });
    });
});
