import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
    Safe: 'green',
    Anomaly: '#FF8C00'
};


export default function Charts({ safeCount, unsafeCount, warningCount, criticalCount }) {
    const data = [
        { name: 'Safe', value: safeCount },
        { name: 'Anomaly', value: warningCount }
    ];

    return (
        <div className="w-full h-48">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);

                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontSize={14}
                                >
                                    {data[index].value}
                                </text>
                            );
                        }}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
