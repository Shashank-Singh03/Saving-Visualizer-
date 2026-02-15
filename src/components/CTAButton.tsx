import { memo } from 'react';
import { motion } from 'framer-motion';
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
        <motion.button
            className={`cta-button ${sticky ? 'sticky' : ''}`}
            onClick={handleClick}
            aria-label="Begin your financial planning journey"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <span className="cta-text">Begin Planning</span>
        </motion.button>
    );
});

CTAButton.displayName = 'CTAButton';
