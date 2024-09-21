import React from 'react';
import { Box, Typography } from '@mui/material';

interface InfectionStatsProps {
  creditsConsumed: number;
  creditsLeft: number;
  totalItems: number;
  itemsCount: number;
}

const InfectionStats: React.FC<InfectionStatsProps> = ({
  creditsConsumed,
  creditsLeft,
  totalItems,
  itemsCount,
}) => {
  return (
    <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      <Typography variant="body2">
        <strong>Credits Consumed:</strong> {creditsConsumed}
      </Typography>
      <Typography variant="body2">
        <strong>Credits Left:</strong> {creditsLeft}
      </Typography>
      <Typography variant="body2">
        <strong>Total Items in Query:</strong> {totalItems}
      </Typography>
      <Typography variant="body2">
        <strong>Items in Current Page:</strong> {itemsCount}
      </Typography>
    </Box>
  );
};

export default InfectionStats;
