import { describe, it, expect } from 'vitest';
import {
    calculateFutureValue,
    adjustForInflation,
    calculateTotalInvested,
    calculateSavings,
    generateChartData,
    formatCurrency,
    formatCompactCurrency
} from '../utils/calculations';

describe('Financial Calculations', () => {
    describe('calculateTotalInvested', () => {
        it('calculates correct total for 1 year', () => {
            expect(calculateTotalInvested(100, 1)).toBe(36500);
        });

        it('calculates correct total for 3 years', () => {
            expect(calculateTotalInvested(100, 3)).toBe(109500);
        });

        it('calculates correct total for 5 years', () => {
            expect(calculateTotalInvested(100, 5)).toBe(182500);
        });
    });

    describe('calculateFutureValue', () => {
        it('calculates compound growth correctly', () => {
            const result = calculateFutureValue(100, 1, 10);
            expect(result).toBeGreaterThan(36500); // Should be more than just invested
            expect(result).toBeLessThan(40000); // But not unrealistically high for 1 year
        });

        it('returns higher values for longer periods', () => {
            const year1 = calculateFutureValue(100, 1, 10);
            const year3 = calculateFutureValue(100, 3, 10);
            const year5 = calculateFutureValue(100, 5, 10);

            expect(year3).toBeGreaterThan(year1 * 3);
            expect(year5).toBeGreaterThan(year3);
        });

        it('returns higher values for higher risk profiles', () => {
            const safe = calculateFutureValue(100, 3, 6.5);
            const balanced = calculateFutureValue(100, 3, 10);
            const growth = calculateFutureValue(100, 3, 13);

            expect(balanced).toBeGreaterThan(safe);
            expect(growth).toBeGreaterThan(balanced);
        });
    });

    describe('adjustForInflation', () => {
        it('reduces future value based on inflation', () => {
            const futureValue = 100000;
            const adjusted = adjustForInflation(futureValue, 3);

            expect(adjusted).toBeLessThan(futureValue);
            expect(adjusted).toBeGreaterThan(0);
        });

        it('reduces more for longer time periods', () => {
            const futureValue = 100000;
            const year1 = adjustForInflation(futureValue, 1);
            const year5 = adjustForInflation(futureValue, 5);

            expect(year5).toBeLessThan(year1);
        });
    });

    describe('calculateSavings', () => {
        it('returns all required metrics', () => {
            const result = calculateSavings(100, 3, 'BALANCED');

            expect(result).toHaveProperty('totalInvested');
            expect(result).toHaveProperty('futureValue');
            expect(result).toHaveProperty('inflationAdjustedValue');
            expect(result).toHaveProperty('totalReturns');
            expect(result).toHaveProperty('doingNothingValue');
        });

        it('calculates total returns correctly', () => {
            const result = calculateSavings(100, 3, 'BALANCED');

            expect(result.totalReturns).toBe(result.futureValue - result.totalInvested);
            expect(result.totalReturns).toBeGreaterThan(0);
        });

        it('shows savings beats doing nothing', () => {
            const result = calculateSavings(100, 3, 'BALANCED');

            expect(result.futureValue).toBeGreaterThan(result.doingNothingValue);
        });
    });

    describe('generateChartData', () => {
        it('generates data points for each year', () => {
            const data = generateChartData(100, 5, 'BALANCED');

            expect(data).toHaveLength(6); // 0-5 years
            expect(data[0].year).toBe(0);
            expect(data[5].year).toBe(5);
        });

        it('shows growth over time', () => {
            const data = generateChartData(100, 5, 'BALANCED');

            expect(data[1].futureValue).toBeGreaterThan(data[0].futureValue);
            expect(data[5].futureValue).toBeGreaterThan(data[1].futureValue);
        });

        it('starts at zero', () => {
            const data = generateChartData(100, 5, 'BALANCED');

            expect(data[0].invested).toBe(0);
            expect(data[0].futureValue).toBe(0);
            expect(data[0].doingNothing).toBe(0);
        });
    });

    describe('formatCurrency', () => {
        it('formats Indian rupees correctly', () => {
            expect(formatCurrency(100000)).toBe('₹1,00,000');
            expect(formatCurrency(1000)).toBe('₹1,000');
        });

        it('removes decimals', () => {
            expect(formatCurrency(100000.99)).toBe('₹1,00,000');
        });
    });

    describe('formatCompactCurrency', () => {
        it('formats crores correctly', () => {
            expect(formatCompactCurrency(10000000)).toBe('₹1.00Cr');
        });

        it('formats lakhs correctly', () => {
            expect(formatCompactCurrency(500000)).toBe('₹5.00L');
        });

        it('formats thousands correctly', () => {
            expect(formatCompactCurrency(50000)).toBe('₹50.00K');
        });

        it('formats small amounts without suffix', () => {
            const result = formatCompactCurrency(500);
            expect(result).toContain('₹500');
        });
    });
});
