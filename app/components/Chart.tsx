import React from 'react';
import { CompletionDto } from '@/api-client';
import { XAxis, Tooltip, ResponsiveContainer, Line, LineChart, CartesianAxis, CartesianGrid } from 'recharts';

interface ChartProps {
    completionData: CompletionDto[];
}

const LineChartComponent = ({ completionData }: ChartProps) => {
  const today = new Date();
  const data = [];
  const days = 30;

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    data.push({
      name: date.toDateString().slice(0, 10),
      i: days - i,
      completed: completionData.filter(x => x.completedOn && x.completedOn.toDateString() == date.toDateString()).length
    });
  }

  return (
    <div className="w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%" minHeight={'300px'}>
            <LineChart width={1000} height={300} data={data.sort(x => x.i).reverse()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#0F766E" strokeWidth={3} dot={true} />
            </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
