import { memo } from 'react';
import './CTAButton.css';

interface CTAButtonProps {
    sticky?: boolean;
}

export const CTAButton = memo(({ sticky = false }: CTAButtonProps) => {
    const handleClick = () => {
        // In a real app, this would navigate to signup or trigger a modal
        console.log('CTA clicked - Start saving today!');
        alert('Great choice! In a production app, this would take you to account creation.');
    };

    return (
        <button
            className={`cta-button ${sticky ? 'sticky' : ''}`}
            onClick={handleClick}
            aria-label="Start your savings journey today"
        >
            <span className="cta-text">Start Saving Today</span>
            <span className="cta-icon">→</span>
        </button>
    );
});

CTAButton.displayName = 'CTAButton';
