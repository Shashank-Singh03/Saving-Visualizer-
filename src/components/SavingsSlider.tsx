import { memo, useEffect, useRef, useState } from 'react';
import { FINANCIAL_CONSTANTS } from '../constants/financial';
import './SavingsSlider.css';

interface SavingsSliderProps {
    value: number;
    onChange: (value: number) => void;
}

export const SavingsSlider = memo(({ value, onChange }: SavingsSliderProps) => {
    const [displayValue, setDisplayValue] = useState(value);
    const animationRef = useRef<number>();

    // Smooth number animation when value changes externally
    useEffect(() => {
        if (displayValue !== value) {
            const difference = value - displayValue;
            const step = difference / 10;

            const animate = () => {
                setDisplayValue((prev) => {
                    const next = prev + step;
                    if (Math.abs(next - value) < 1) {
                        return value;
                    }
                    animationRef.current = requestAnimationFrame(animate);
                    return next;
                });
            };

            animationRef.current = requestAnimationFrame(animate);

            return () => {
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                }
            };
        }
    }, [value, displayValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setDisplayValue(newValue);
        onChange(newValue);
    };

    const monthlyAmount = Math.round(value * 30);
    const yearlyAmount = Math.round(value * 365);

    const percentage =
        ((value - FINANCIAL_CONSTANTS.MIN_DAILY_SAVINGS) /
            (FINANCIAL_CONSTANTS.MAX_DAILY_SAVINGS - FINANCIAL_CONSTANTS.MIN_DAILY_SAVINGS)) * 100;

    return (
        <div className="savings-slider">
            <div className="slider-value-display">
                <div className="daily-value">
                    <span className="currency">₹</span>
                    <span className="amount">{Math.round(displayValue)}</span>
                    <span className="period">/day</span>
                </div>
                <div className="breakdown">
                    <span>≈ ₹{monthlyAmount.toLocaleString('en-IN')}/month</span>
                    <span className="separator">•</span>
                    <span>≈ ₹{yearlyAmount.toLocaleString('en-IN')}/year</span>
                </div>
            </div>

            <div className="slider-container">
                <input
                    type="range"
                    min={FINANCIAL_CONSTANTS.MIN_DAILY_SAVINGS}
                    max={FINANCIAL_CONSTANTS.MAX_DAILY_SAVINGS}
                    step="1"
                    value={value}
                    onChange={handleChange}
                    className="slider-input"
                    aria-label="Daily savings amount"
                    aria-valuemin={FINANCIAL_CONSTANTS.MIN_DAILY_SAVINGS}
                    aria-valuemax={FINANCIAL_CONSTANTS.MAX_DAILY_SAVINGS}
                    aria-valuenow={value}
                    aria-valuetext={`₹${value} per day`}
                    style={{
                        background: `linear-gradient(to right, 
              #667eea 0%, 
              #764ba2 ${percentage}%, 
              rgba(255, 255, 255, 0.1) ${percentage}%, 
              rgba(255, 255, 255, 0.1) 100%)`
                    }}
                />
                <div className="slider-labels">
                    <span>₹{FINANCIAL_CONSTANTS.MIN_DAILY_SAVINGS}</span>
                    <span>₹{FINANCIAL_CONSTANTS.MAX_DAILY_SAVINGS}</span>
                </div>
            </div>
        </div>
    );
});

SavingsSlider.displayName = 'SavingsSlider';
