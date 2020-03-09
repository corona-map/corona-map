import React from 'react';

import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function Chart({ series }) {
  return (
    <>
    <ResponsiveContainer height={150}>
      <ComposedChart
        data={series.slice(-10)}
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type='category' dataKey='date' name='date' />
        <YAxis type='number' dataKey='value' name='number of cases' /* domain={[0, 1000]} */ />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          labelFormatter={(date) => `Date: ${date}`}
          formatter={(value, name) => name === 'value' ? [] : value}
        />
        <Legend />
        <Bar dataKey='value' barSize={10} fill='#413ea0' legendType='none' />
        <Line dataKey='value' stroke='#ff7300' name='Total cases' type='monotone' />
      </ComposedChart>
    </ResponsiveContainer>
    </>
  );
}

export default Chart;
