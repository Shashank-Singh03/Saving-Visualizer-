import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { RiskProfile } from '../constants/financial';
import { FINANCIAL_CONSTANTS } from '../constants/financial';
import { useDebounce } from '../hooks/useDebounce';
import { useSavingsCalculator } from '../hooks/useSavingsCalculator';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Navbar } from './Navbar';
import { SavingsSlider } from './SavingsSlider';
import { TimeHorizonSelector } from './TimeHorizonSelector';
import { RiskProfileToggle } from './RiskProfileToggle';
import { SavingsChart } from './SavingsChart';
import { MetricsDisplay } from './MetricsDisplay';
import { ExpectedImpactSection } from './ExpectedImpactSection';
import { DesignDecisionsSection } from './DesignDecisionsSection';
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

    // Scroll reveal hooks for each section
    const controlsReveal = useScrollReveal({ threshold: 0.1 });
    const resultsReveal = useScrollReveal({ threshold: 0.1 });
    const chartReveal = useScrollReveal({ threshold: 0.1 });

    return (
        <div className="savings-visualizer">
            <Navbar />

            <header id="hero" className="visualizer-header">
                <h1>Consistent saving compounds meaningfully over time</h1>
                <p className="subtitle">
                    See the long-term impact of daily savings
                </p>
            </header>

            <div className="visualizer-content">
                <motion.section
                    id="mechanism"
                    ref={controlsReveal.ref}
                    className="controls-section"
                    aria-label="Savings calculator controls"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controlsReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
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
                </motion.section>

                <motion.section
                    id="projections"
                    ref={resultsReveal.ref}
                    className="results-section"
                    aria-label="Calculation results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={resultsReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                >
                    <MetricsDisplay
                        metrics={metrics}
                        dailySavings={debouncedDailySavings}
                    />

                    <motion.div
                        ref={chartReveal.ref}
                        className="chart-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={chartReveal.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
                    >
                        <h3 className="chart-title">Growth Projection Over Time</h3>
                        <SavingsChart data={chartData} />
                    </motion.div>
                </motion.section>

                {/* Product-thinking sections */}
                <ExpectedImpactSection id="philosophy" />
                <DesignDecisionsSection id="rationale" />

                <section id="begin" className="cta-section">
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
