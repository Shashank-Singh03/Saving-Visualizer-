/**
 * Financial Constants and Assumptions
 * 
 * These values are based on historical Indian market data and
 * conservative projections for realistic user expectations.
 */

export const FINANCIAL_CONSTANTS = {
  // Expected annual returns by risk profile (%)
  RETURNS: {
    SAFE: 6.5,      // Similar to FD/debt funds
    BALANCED: 10,   // Mix of equity and debt
    GROWTH: 13      // Equity-heavy portfolio
  },
  
  // Average annual inflation rate in India (%)
  INFLATION_RATE: 6,
  
  // Slider constraints
  MIN_DAILY_SAVINGS: 51,
  MAX_DAILY_SAVINGS: 500,
  DEFAULT_DAILY_SAVINGS: 101,
  
  // Time horizons (years)
  TIME_HORIZONS: [
    { value: 1, label: '1 Year' },
    { value: 3, label: '3 Years' },
    { value: 5, label: '5 Years' }
  ],
  
  // Risk profiles
  RISK_PROFILES: ['SAFE', 'BALANCED', 'GROWTH'] as const
} as const;

export type RiskProfile = typeof FINANCIAL_CONSTANTS.RISK_PROFILES[number];
