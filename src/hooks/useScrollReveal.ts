import { useRef, useEffect, useState } from 'react';

interface UseScrollRevealOptions {
    threshold?: number;
    rootMargin?: string;
}

interface UseScrollRevealReturn {
    ref: React.RefObject<HTMLDivElement | null>;
    isVisible: boolean;
}

/**
 * Custom hook for scroll-triggered animations
 * Uses IntersectionObserver for performance
 * Automatically disabled when prefers-reduced-motion is set
 * 
 * @param options - IntersectionObserver configuration
 * @returns ref to attach to element and visibility state
 */
export function useScrollReveal({
    threshold = 0.1,
    rootMargin = '0px'
}: UseScrollRevealOptions = {}): UseScrollRevealReturn {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        // If reduced motion is preferred, immediately show element
        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing
                    observer.unobserve(element);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin]);

    return { ref, isVisible };
}
