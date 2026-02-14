import { memo } from 'react';
import { formatCurrency, formatCompactCurrency } from '../utils/calculations';
import type { SavingsCalculation } from '../utils/calculations';
import './MetricsDisplay.css';

interface MetricsDisplayProps {
    metrics: SavingsCalculation;
    dailySavings: number;
}

export const MetricsDisplay = memo(({ metrics, dailySavings }: MetricsDisplayProps) => {
    const savingsGain = metrics.futureValue - metrics.doingNothingValue;
    const returnPercentage = ((metrics.totalReturns / metrics.totalInvested) * 100).toFixed(1);

    return (
        <div className="metrics-display">
            <div className="metrics-header">
                <h3>Your Wealth Journey</h3>
                <p className="micro-copy">
                    Just ₹{dailySavings}/day can transform your financial future
                </p>
            </div>

            <div className="metrics-grid">
                <div className="metric-card primary">
                    <div className="metric-icon">💰</div>
                    <div className="metric-content">
                        <span className="metric-label">Future Corpus</span>
                        <span className="metric-value">{formatCompactCurrency(metrics.futureValue)}</span>
                        <span className="metric-subtitle">{formatCurrency(metrics.futureValue)}</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">📈</div>
                    <div className="metric-content">
                        <span className="metric-label">Total Returns</span>
                        <span className="metric-value">{formatCompactCurrency(metrics.totalReturns)}</span>
                        <span className="metric-subtitle">{returnPercentage}% gain</span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon">💵</div>
                    <div className="metric-content">
                        <span className="metric-label">You'll Invest</span>
                        <span className="metric-value">{formatCompactCurrency(metrics.totalInvested)}</span>
                        <span className="metric-subtitle">{formatCurrency(metrics.totalInvested)}</span>
                    </div>
                </div>

                <div className="metric-card highlight">
                    <div className="metric-icon">🚀</div>
                    <div className="metric-content">
                        <span className="metric-label">vs Doing Nothing</span>
                        <span className="metric-value">+{formatCompactCurrency(savingsGain)}</span>
                        <span className="metric-subtitle">Real purchasing power gain</span>
                    </div>
                </div>
            </div>

            <div className="inflation-note">
                <span className="note-icon">ℹ️</span>
                <p>
                    <strong>Real value:</strong> {formatCurrency(metrics.inflationAdjustedValue)}
                    {' '}(adjusted for ~6% annual inflation)
                </p>
            </div>
        </div>
    );
});

MetricsDisplay.displayName = 'MetricsDisplay';
