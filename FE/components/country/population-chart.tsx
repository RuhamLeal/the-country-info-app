'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Rectangle,
} from 'recharts';

type PopulationChartProps = {
    population: { year: number; value: number }[];
};

export default function PopulationChart({ population }: PopulationChartProps) {
    if (!population || !population?.length) return <div className='flex justify-center items-center p-4 bg-slate-950 rounded-lg'>No Population data found</div>;

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    data={population}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 2" />
                    <XAxis

                        dataKey="year"
                        label={{ value: 'Year', position: 'insideBottomLeft', offset: -10 }}
                    />
                    <YAxis
                        label={{ value: 'Population', angle: -90, position: 'bottom', offset: -10 }}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        formatter={(value: number) => [value.toLocaleString(), 'Population']}
                        labelFormatter={(label: number) => <span style={{ color: '#4b44f0' }}>Year: {label}</span>}
                    />
                    <Legend
                        layout="vertical"
                        align="center"
                        verticalAlign="bottom"
                        formatter={() => 'Population'}
                    />
                    <Bar dataKey="value" fill="#736be9" name="Population" activeBar={<Rectangle fill="#4425d2" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
