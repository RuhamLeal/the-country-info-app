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
    if (!population || !population?.length) return <div style={{ width: '100%', height: 300 }}>Nenhum dado de populaçao disponivel</div>;

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
                        label={{ value: 'Ano', position: 'insideBottomLeft', offset: -10 }}
                    />
                    <YAxis
                        label={{ value: 'População', angle: -90, position: 'insideLeft', offset: -10 }}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        formatter={(value: number) => [value.toLocaleString(), 'População']}
                        labelFormatter={(label: number) => <span style={{ color: '#4b44f0' }}>Ano: {label}</span>}
                    />
                    <Legend
                        layout="vertical"
                        align="center"
                        verticalAlign="bottom"
                        formatter={() => 'População'}
                    />
                    <Bar dataKey="value" fill="#4425d2" name="População" activeBar={<Rectangle fill="#331cb2" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
