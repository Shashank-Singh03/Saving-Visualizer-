import { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { ChartDataPoint } from '../utils/calculations';
import './SavingsChart.css';

interface SavingsChartProps {
    data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
        <div className="custom-tooltip">
            <p className="tooltip-year">Year {data.year}</p>
            <div className="tooltip-row future">
                <span className="tooltip-label">With Savings:</span>
                <span className="tooltip-value">₹{data.futureValue.toLocaleString('en-IN')}</span>
            </div>
            <div className="tooltip-row invested">
                <span className="tooltip-label">Invested:</span>
                <span className="tooltip-value">₹{data.invested.toLocaleString('en-IN')}</span>
            </div>
            <div className="tooltip-row nothing">
                <span className="tooltip-label">Doing Nothing:</span>
                <span className="tooltip-value">₹{data.doingNothing.toLocaleString('en-IN')}</span>
            </div>
        </div>
    );
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
                        <linearGradient id="colorFutureValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#667eea" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f093fb" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f093fb" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="colorDoingNothing" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbc2eb" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#fbc2eb" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        dataKey="year"
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)' }}
                        label={{ value: 'Years', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.7)' }}
                    />
                    <YAxis
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.7)' }}
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }}
                        iconType="rect"
                    />
                    <Area
                        type="monotone"
                        dataKey="doingNothing"
                        stroke="#fbc2eb"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorDoingNothing)"
                        name="Doing Nothing"
                        animationDuration={1000}
                    />
                    <Area
                        type="monotone"
                        dataKey="invested"
                        stroke="#f093fb"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorInvested)"
                        name="Total Invested"
                        animationDuration={1000}
                    />
                    <Area
                        type="monotone"
                        dataKey="futureValue"
                        stroke="#667eea"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorFutureValue)"
                        name="Future Value"
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
});

SavingsChart.displayName = 'SavingsChart';
