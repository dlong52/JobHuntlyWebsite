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
  Cell,
} from 'recharts';
import helpers from '../../../utils/helpers';

// Dữ liệu mẫu
const data = [
  { name: 'IT', jobs: 4000, color: '#4CAF50' },
  { name: 'Y tế', jobs: 3000, color: '#2196F3' },
  { name: 'Giáo dục', jobs: 2000, color: '#FF9800' },
  { name: 'Kinh doanh', jobs: 2780, color: '#F44336' },
  { name: 'Xây dựng', jobs: 1890, color: '#9C27B0' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border p-2 rounded shadow-lg">
        <h4 className="text-lg font-semibold">{payload[0].payload.name}</h4>
        <p className="text-gray-700">{helpers.numberFormat(payload[0].value)} việc làm</p>
      </div>
    );
  }
  return null;
};

const JobBarChart = () => {
  return (
    <div className="">
      <h2 className=" text-white font-bold mb-4">Nhu cầu tuyển dụng theo ngành nghề</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <defs>
            {data.map((entry, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                <stop offset="100%" stopColor={entry.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="10 3" stroke="#f0f8ff4f" />
          <XAxis dataKey="name" fontSize={12} stroke="#fff" />
          <YAxis fontSize={12} stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Bar dataKey="jobs" animationDuration={500}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center mx-4">
            <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: entry.color }} />
            <span className="text-white text-nowrap">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBarChart;
