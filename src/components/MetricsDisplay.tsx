import { memo } from 'react';
import { formatCurrency, formatCompactCurrency } from '../utils/calculations';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';
import type { SavingsCalculation } from '../utils/calculations';
import './MetricsDisplay.css';

interface MetricsDisplayProps {
    metrics: SavingsCalculation;
    dailySavings: number;
}

export const MetricsDisplay = memo(({ metrics, dailySavings }: MetricsDisplayProps) => {
    // Animate all numeric values
    const animatedFutureValue = useAnimatedNumber(metrics.futureValue);
    const animatedTotalReturns = useAnimatedNumber(metrics.totalReturns);
    const animatedTotalInvested = useAnimatedNumber(metrics.totalInvested);
    const animatedSavingsGain = useAnimatedNumber(metrics.futureValue - metrics.doingNothingValue);

    const returnPercentage = ((metrics.totalReturns / metrics.totalInvested) * 100).toFixed(1);

    return (
        <div className="metrics-display">
            <div className="metrics-header">
                <h3>Projected Value</h3>
                <p className="micro-copy">
                    Based on ₹{dailySavings} daily over time
                </p>
            </div>

            <div className="metrics-grid">
                <div className="metric-card primary">
                    <div className="metric-content">
                        <span className="metric-label">Total Projected</span>
                        <span className="metric-value">{formatCompactCurrency(animatedFutureValue)}</span>
                        <span className="metric-subtitle">{formatCurrency(animatedFutureValue)}</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-content">
                        <span className="metric-label">Returns Generated</span>
                        <span className="metric-value">{formatCompactCurrency(animatedTotalReturns)}</span>
                        <span className="metric-subtitle">{returnPercentage}% gain</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-content">
                        <span className="metric-label">Amount Invested</span>
                        <span className="metric-value">{formatCompactCurrency(animatedTotalInvested)}</span>
                        <span className="metric-subtitle">{formatCurrency(animatedTotalInvested)}</span>
                    </div>
                </div>

                <div className="metric-card highlight">
                    <div className="metric-content">
                        <span className="metric-label">Opportunity Cost</span>
                        <span className="metric-value">+{formatCompactCurrency(animatedSavingsGain)}</span>
                        <span className="metric-subtitle">Real value preserved</span>
                    </div>
                </div>
            </div>

            <div className="inflation-note">
                <p>
                    <strong>Inflation-adjusted value:</strong> {formatCurrency(metrics.inflationAdjustedValue)}
                    {' '}(assuming ~6% annual inflation)
                </p>
            </div>
        </div>
    );
});

MetricsDisplay.displayName = 'MetricsDisplay';
