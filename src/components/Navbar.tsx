import { useState, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
    className?: string;
}

const navItems = [
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Mechanism', id: 'mechanism' },
    { label: 'Projections', id: 'projections' },
    { label: 'Rationale', id: 'rationale' },
    { label: 'Begin', id: 'begin' }
];

export const Navbar = ({ className = '' }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${className}`} role="navigation" aria-label="Main navigation">
            <div className="navbar-content">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="nav-item"
                        aria-label={`Navigate to ${item.label} section`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};
