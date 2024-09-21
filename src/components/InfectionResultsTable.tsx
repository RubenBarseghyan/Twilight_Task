import React from 'react';
import { Button, Grid, Box } from '@mui/material';
import InfectionStats from './InfectionStats';
import MalwarePieChart from './MalwarePieChart';
import OSPieChart from './OSPieChart';
import InfectionCard from './InfectionCard';
import { DataItem, ComputerInformation } from '../interfaces/dataInterfaces';

interface InfectionResultsTableProps {
  data: DataItem[];
  onLoadMore: () => void;
  nextToken: string | null;
  totalItems: number;
  itemsCount: number;
  creditsConsumed: number;
  creditsLeft: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF00AA'];

const InfectionResultsTable: React.FC<InfectionResultsTableProps> = ({
  data,
  onLoadMore,
  nextToken,
  totalItems,
  itemsCount,
  creditsConsumed,
  creditsLeft,
}) => {

  const preparePieChartData = (keyName: keyof ComputerInformation, defaultValue: string) =>
    data.reduce((acc, curr) => {
      const key = curr.computer_information[keyName] || defaultValue;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Malware distribution pie chart
  const malwareDistribution = data.reduce((acc, curr) => {
    const type = curr.stealer_type || 'Unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartDataMalware = Object.entries(malwareDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // OS distribution pie chart
  const osDistribution = preparePieChartData('os', 'Unknown OS');
  const pieChartDataOS = Object.entries(osDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  if (!data || data.length === 0) {
    return <></>;
  }

  return (
    <Box sx={{ paddingBottom: '80px', position: 'relative' }}>
      {/* Infection Statistics */}
      <InfectionStats
        creditsConsumed={creditsConsumed}
        creditsLeft={creditsLeft}
        totalItems={totalItems}
        itemsCount={itemsCount}
      />

      {/* OS and Malware Distribution Pie Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <OSPieChart pieChartDataOS={pieChartDataOS} COLORS={COLORS} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MalwarePieChart pieChartDataMalware={pieChartDataMalware} COLORS={COLORS} />
        </Grid>
      </Grid>

      {/* Display Data in Card Layout */}
      <Grid container spacing={3} sx={{ marginBottom: '16px' }}>
        {data.map((row) => (
          <Grid item xs={12} key={row.id}>
            <InfectionCard row={row} />
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      {nextToken && (
        <Box
          sx={{
            position: 'sticky',
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            padding: '8px 0',
            boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Button
            onClick={onLoadMore}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(InfectionResultsTable);
