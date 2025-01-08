import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Dữ liệu mẫu
const data = [
  { name: '1-50 Nhân sự', value: 400 },
  { name: '51-250 Nhân sự', value: 300 },
  { name: '251-1000 Nhân sự', value: 300 },
  { name: '>1000 Nhân sự', value: 200 },
];

// Màu sắc cho từng phần
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BusinessSizeChart = () => {
  return (
    <div className="bg-blue-950 p-4 rounded-lg">
      <h2 className="text-white font-bold mb-4">Phân loại quy mô doanh nghiệp theo số lượng nhân sự</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BusinessSizeChart;
