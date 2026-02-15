import { useState, useEffect } from 'react';
import { CinematicIntro } from './CinematicIntro';
import { SavingsVisualizer } from './SavingsVisualizer';
import './LandingEntry.css';

export const LandingEntry = () => {
    const [showIntro, setShowIntro] = useState(true);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    useEffect(() => {
        // Skip intro if user prefers reduced motion
        if (prefersReducedMotion) {
            setShowIntro(false);
            return;
        }

        // Auto-hide intro after 3 seconds
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    const handleSkipIntro = () => {
        setShowIntro(false);
    };

    return (
        <>
            {showIntro && !prefersReducedMotion && (
                <CinematicIntro onComplete={handleSkipIntro} />
            )}

            <div className={`main-landing ${!showIntro ? 'visible' : 'hidden'}`}>
                <SavingsVisualizer />
            </div>
        </>
    );
};
