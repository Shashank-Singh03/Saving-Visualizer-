import { useMemo } from 'react';
import type { RiskProfile } from '../constants/financial';
import {
    calculateSavings,
    generateChartData
} from '../utils/calculations';
import type {
    SavingsCalculation,
    ChartDataPoint
} from '../utils/calculations';

interface UseSavingsCalculatorResult {
    metrics: SavingsCalculation;
    chartData: ChartDataPoint[];
}

/**
 * Custom hook that encapsulates all savings calculations
 * Uses useMemo to prevent unnecessary recalculations
 * 
 * @param dailySavings - Daily savings amount
 * @param years - Time horizon in years
 * @param riskProfile - Risk profile (SAFE/BALANCED/GROWTH)
 * @returns Calculated metrics and chart data
 */
export function useSavingsCalculator(
    dailySavings: number,
    years: number,
    riskProfile: RiskProfile
): UseSavingsCalculatorResult {
    const metrics = useMemo(
        () => calculateSavings(dailySavings, years, riskProfile),
        [dailySavings, years, riskProfile]
    );

    const chartData = useMemo(
        () => generateChartData(dailySavings, years, riskProfile),
        [dailySavings, years, riskProfile]
    );

    return { metrics, chartData };
}
