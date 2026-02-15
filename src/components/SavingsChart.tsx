import { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../utils/calculations';
import { formatCurrency, formatCompactCurrency } from '../utils/calculations';
import './SavingsChart.css';

interface SavingsChartProps {
    data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="tooltip-year">Year {payload[0].payload.year}</p>
                <p className="tooltip-value">{formatCurrency(payload[0].value as number)}</p>
            </div>
        );
    }
    return null;
};

export const SavingsChart = memo(({ data }: SavingsChartProps) => {
    return (
        <div className="savings-chart">
            <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C6A96B" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#C6A96B" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="0"
                        stroke="rgba(198, 169, 107, 0.08)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="year"
                        stroke="rgba(201, 206, 214, 0.3)"
                        tick={{ fill: 'rgba(201, 206, 214, 0.6)', fontSize: 13 }}
                        axisLine={{ stroke: 'rgba(198, 169, 107, 0.15)' }}
                    />
                    <YAxis
                        tickFormatter={(value) => formatCompactCurrency(value)}
                        stroke="rgba(201, 206, 214, 0.3)"
                        tick={{ fill: 'rgba(201, 206, 214, 0.6)', fontSize: 13 }}
                        axisLine={{ stroke: 'rgba(198, 169, 107, 0.15)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="futureValue"
                        stroke="#C6A96B"
                        strokeWidth={2}
                        fill="url(#goldGradient)"
                        animationDuration={600}
                        animationEasing="ease-out"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
});

SavingsChart.displayName = 'SavingsChart';
