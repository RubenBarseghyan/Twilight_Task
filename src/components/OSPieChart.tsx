import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface OSPieChartProps {
  pieChartDataOS: Array<{ name: string; value: number }>;
  COLORS: string[];
}

const OSPieChart: React.FC<OSPieChartProps> = ({ pieChartDataOS, COLORS }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        Operating System Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartDataOS}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieChartDataOS.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default React.memo(OSPieChart);
