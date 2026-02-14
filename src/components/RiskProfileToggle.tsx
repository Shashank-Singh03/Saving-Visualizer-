import { memo } from 'react';
import type { RiskProfile } from '../constants/financial';
import './RiskProfileToggle.css';

interface RiskProfileToggleProps {
    value: RiskProfile;
    onChange: (profile: RiskProfile) => void;
}

const PROFILES: Array<{ value: RiskProfile; label: string; description: string }> = [
    { value: 'SAFE', label: 'Safe', description: '~6.5% returns' },
    { value: 'BALANCED', label: 'Balanced', description: '~10% returns' },
    { value: 'GROWTH', label: 'Growth', description: '~13% returns' }
];

export const RiskProfileToggle = memo(({ value, onChange }: RiskProfileToggleProps) => {
    return (
        <div className="risk-profile-toggle" role="group" aria-label="Risk profile selector">
            {PROFILES.map((profile) => (
                <button
                    key={profile.value}
                    type="button"
                    className={`risk-option ${value === profile.value ? 'active' : ''}`}
                    onClick={() => onChange(profile.value)}
                    aria-pressed={value === profile.value}
                    aria-label={`${profile.label} risk profile: ${profile.description}`}
                >
                    <span className="risk-label">{profile.label}</span>
                    <span className="risk-description">{profile.description}</span>
                </button>
            ))}
        </div>
    );
});

RiskProfileToggle.displayName = 'RiskProfileToggle';
