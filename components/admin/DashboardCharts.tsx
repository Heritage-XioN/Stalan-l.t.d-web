'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ActivityPoint {
  day: string;
  count: number;
}

interface Props {
  activityData: ActivityPoint[];
}

export function DashboardCharts({ activityData }: Props) {
  const max = Math.max(...activityData.map((d) => d.count), 1);

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={activityData} barSize={24} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fontFamily: 'JetBrains Mono', fill: 'rgba(10,10,10,0.35)', letterSpacing: '0.1em' }}
        />
        <YAxis hide allowDecimals={false} />
        <Tooltip
          cursor={{ fill: 'rgba(10,10,10,0.04)' }}
          contentStyle={{
            background: '#0A0A0A',
            border: 'none',
            borderRadius: 0,
            padding: '6px 12px',
            fontSize: 12,
            color: '#fff',
          }}
          itemStyle={{ color: '#C8F135' }}
          formatter={(value: number) => [value, 'messages']}
        />
        <Bar dataKey="count" radius={0}>
          {activityData.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.count > 0 && entry.count === max ? '#C8F135' : entry.count > 0 ? '#0A0A0A' : 'rgba(10,10,10,0.08)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}