import React, { useLayoutEffect, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = () => {
  const today = new Date();
  const data = [];
  const days = 30;

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.push({
      name: date.toDateString().slice(0, 10),
      i: days - i,
      pv: Math.floor(Math.random() * 10000),
      amt: Math.floor(Math.random() * 10000)
    });
  }

  return (
    <div className="w-full">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={1000} height={300} data={data.sort(x => x.i).reverse()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
