import { useEffect, useState } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

/**
 * Custom hook for smooth number counting animation
 * Uses Framer Motion's spring animation for natural feel
 * 
 * @param value - Target number to animate to
 * @returns Animated value that smoothly transitions
 */
export function useAnimatedNumber(value: number): number {
    const [displayValue, setDisplayValue] = useState(value);
    const motionValue = useMotionValue(displayValue);
    const springValue = useSpring(motionValue, {
        stiffness: 100,
        damping: 20
    });

    useEffect(() => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            // Skip animation, set value immediately
            setDisplayValue(value);
            return;
        }

        motionValue.set(value);

        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });

        return () => {
            unsubscribe();
        };
    }, [value, motionValue, springValue]);

    return displayValue;
}
