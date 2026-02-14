/**
 * Financial calculation utilities
 * All calculations use compound interest formulas with Indian market assumptions
 */

import { FINANCIAL_CONSTANTS } from '../constants/financial';
import type { RiskProfile } from '../constants/financial';

export interface SavingsCalculation {
    totalInvested: number;
    futureValue: number;
    inflationAdjustedValue: number;
    totalReturns: number;
    doingNothingValue: number;
}

export interface ChartDataPoint {
    year: number;
    invested: number;
    futureValue: number;
    doingNothing: number;
}

/**
 * Calculate compound interest with monthly contributions
 * Formula: FV = P × [((1 + r)^n - 1) / r] × (1 + r)
 * Where P = monthly payment, r = monthly rate, n = number of months
 */
export function calculateFutureValue(
    dailySavings: number,
    years: number,
    annualRate: number
): number {
    const monthlyContribution = dailySavings * 30; // Approximate monthly from daily
    const monthlyRate = annualRate / 100 / 12;
    const months = years * 12;

    if (monthlyRate === 0) {
        return monthlyContribution * months;
    }

    const futureValue = monthlyContribution *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    return Math.round(futureValue);
}

/**
 * Adjust for inflation to show real purchasing power
 * Formula: Real Value = Nominal Value / (1 + inflation)^years
 */
export function adjustForInflation(futureValue: number, years: number): number {
    const inflationRate = FINANCIAL_CONSTANTS.INFLATION_RATE / 100;
    const realValue = futureValue / Math.pow(1 + inflationRate, years);
    return Math.round(realValue);
}

/**
 * Calculate total amount invested over the period
 */
export function calculateTotalInvested(dailySavings: number, years: number): number {
    return dailySavings * 365 * years;
}

/**
 * Main calculation function that returns all metrics
 */
export function calculateSavings(
    dailySavings: number,
    years: number,
    riskProfile: RiskProfile
): SavingsCalculation {
    const annualRate = FINANCIAL_CONSTANTS.RETURNS[riskProfile];
    const totalInvested = calculateTotalInvested(dailySavings, years);
    const futureValue = calculateFutureValue(dailySavings, years, annualRate);
    const inflationAdjustedValue = adjustForInflation(futureValue, years);
    const totalReturns = futureValue - totalInvested;

    // "Doing nothing" assumes money sits idle (loses to inflation)
    const doingNothingValue = adjustForInflation(totalInvested, years);

    return {
        totalInvested,
        futureValue,
        inflationAdjustedValue,
        totalReturns,
        doingNothingValue
    };
}

/**
 * Generate chart data points for visualization
 */
export function generateChartData(
    dailySavings: number,
    maxYears: number,
    riskProfile: RiskProfile
): ChartDataPoint[] {
    const data: ChartDataPoint[] = [{ year: 0, invested: 0, futureValue: 0, doingNothing: 0 }];

    for (let year = 1; year <= maxYears; year++) {
        const calculation = calculateSavings(dailySavings, year, riskProfile);
        data.push({
            year,
            invested: calculation.totalInvested,
            futureValue: calculation.futureValue,
            doingNothing: calculation.doingNothingValue
        });
    }

    return data;
}

/**
 * Format currency in Indian Rupee format
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format large numbers with K/L notation
 */
export function formatCompactCurrency(amount: number): string {
    if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }
    if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)}L`;
    }
    if (amount >= 1000) {
        return `₹${(amount / 1000).toFixed(2)}K`;
    }
    return `₹${amount.toFixed(0)}`;
}
