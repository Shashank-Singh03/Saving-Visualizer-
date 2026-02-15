import { ShaderBackground } from './ShaderBackground';
import { IntroContent } from './IntroContent';
import './CinematicIntro.css';

interface CinematicIntroProps {
    onComplete?: () => void;
}

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
    return (
        <div className="cinematic-intro">
            <ShaderBackground />
            <IntroContent />

            {/* Skip intro button for accessibility */}
            <button
                className="skip-intro"
                onClick={onComplete}
                aria-label="Skip introduction"
            >
                Skip to content
            </button>
        </div>
    );
};
