import { memo } from 'react';
import { FINANCIAL_CONSTANTS } from '../constants/financial';
import './TimeHorizonSelector.css';

interface TimeHorizonSelectorProps {
    value: number;
    onChange: (years: number) => void;
}

export const TimeHorizonSelector = memo(({ value, onChange }: TimeHorizonSelectorProps) => {
    return (
        <div className="time-horizon-selector" role="group" aria-label="Time horizon selector">
            {FINANCIAL_CONSTANTS.TIME_HORIZONS.map((horizon) => (
                <button
                    key={horizon.value}
                    type="button"
                    className={`horizon-option ${value === horizon.value ? 'active' : ''}`}
                    onClick={() => onChange(horizon.value)}
                    aria-pressed={value === horizon.value}
                    aria-label={`${horizon.label} investment period`}
                >
                    {horizon.label}
                </button>
            ))}
        </div>
    );
});

TimeHorizonSelector.displayName = 'TimeHorizonSelector';
