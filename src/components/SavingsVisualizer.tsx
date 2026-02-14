import { useState, useCallback } from 'react';
import type { RiskProfile } from '../constants/financial';
import { FINANCIAL_CONSTANTS } from '../constants/financial';
import { useDebounce } from '../hooks/useDebounce';
import { useSavingsCalculator } from '../hooks/useSavingsCalculator';
import { SavingsSlider } from './SavingsSlider';
import { TimeHorizonSelector } from './TimeHorizonSelector';
import { RiskProfileToggle } from './RiskProfileToggle';
import { SavingsChart } from './SavingsChart';
import { MetricsDisplay } from './MetricsDisplay';
import { CTAButton } from './CTAButton';
import './SavingsVisualizer.css';

export function SavingsVisualizer() {
    const [dailySavings, setDailySavings] = useState<number>(FINANCIAL_CONSTANTS.DEFAULT_DAILY_SAVINGS);
    const [timeHorizon, setTimeHorizon] = useState<number>(FINANCIAL_CONSTANTS.TIME_HORIZONS[1].value);
    const [riskProfile, setRiskProfile] = useState<RiskProfile>('BALANCED');

    // Debounce the daily savings to prevent excessive calculations during slider drag
    const debouncedDailySavings = useDebounce(dailySavings, 150);

    // Calculate metrics with debounced value
    const { metrics, chartData } = useSavingsCalculator(
        debouncedDailySavings,
        timeHorizon,
        riskProfile
    );

    // Memoize callbacks to prevent unnecessary re-renders
    const handleDailySavingsChange = useCallback((value: number) => {
        setDailySavings(value);
    }, []);

    const handleTimeHorizonChange = useCallback((years: number) => {
        setTimeHorizon(years);
    }, []);

    const handleRiskProfileChange = useCallback((profile: RiskProfile) => {
        setRiskProfile(profile);
    }, []);

    return (
        <div className="savings-visualizer">
            <header className="visualizer-header">
                <h1>Small Daily Savings → Real Wealth Over Time</h1>
                <p className="subtitle">
                    See how consistent daily savings can transform your financial future with the power of compound growth
                </p>
            </header>

            <div className="visualizer-content">
                <section className="controls-section" aria-label="Savings calculator controls">
                    <div className="control-group">
                        <label htmlFor="savings-slider" className="control-label">
                            Daily Savings Amount
                        </label>
                        <SavingsSlider
                            value={dailySavings}
                            onChange={handleDailySavingsChange}
                        />
                    </div>

                    <div className="control-group">
                        <label className="control-label">Investment Period</label>
                        <TimeHorizonSelector
                            value={timeHorizon}
                            onChange={handleTimeHorizonChange}
                        />
                    </div>

                    <div className="control-group">
                        <label className="control-label">Risk Profile</label>
                        <RiskProfileToggle
                            value={riskProfile}
                            onChange={handleRiskProfileChange}
                        />
                    </div>
                </section>

                <section className="results-section" aria-label="Calculation results">
                    <MetricsDisplay
                        metrics={metrics}
                        dailySavings={debouncedDailySavings}
                    />

                    <div className="chart-container">
                        <h3 className="chart-title">Growth Projection Over Time</h3>
                        <SavingsChart data={chartData} />
                    </div>
                </section>

                <section className="cta-section">
                    <CTAButton sticky />
                </section>
            </div>

            <footer className="visualizer-footer">
                <p className="disclaimer">
                    * Projections are based on historical market data and conservative assumptions.
                    Actual returns may vary. Past performance does not guarantee future results.
                </p>
            </footer>
        </div>
    );
}
