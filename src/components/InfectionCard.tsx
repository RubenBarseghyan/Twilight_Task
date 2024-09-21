import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { DataItem } from '../interfaces/dataInterfaces';
import { format } from 'date-fns';

interface InfectionCardProps {
  row: DataItem;
}

const InfectionCard: React.FC<InfectionCardProps> = ({ row }) => {
  // Reusable function for date formatting
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PPPpp');
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          <strong>ID:</strong> {row.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>IP:</strong> {row.computer_information?.ip || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>User:</strong> {row.computer_information?.username || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Date:</strong> {formatDate(row.computer_information?.infection_date)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Path:</strong> {row.computer_information?.malware_path || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>OS:</strong> {row.computer_information?.os || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Country:</strong> {row.computer_information?.country || 'N/A'}
        </Typography>

        {/* Additional Information */}
        <Typography variant="body2" color="text.secondary">
          <strong>Stealer Type:</strong> {row.stealer_type || 'Unknown'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Log File Name:</strong> {row.log_file_name || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Log Checksum:</strong> {row.log_checksum || 'N/A'}
        </Typography>

        {/* Displaying Credentials */}
        <Typography variant="body2" color="text.secondary">
          <strong>Credentials:</strong>
          {row.credentials.length > 0 ? (
            <ul>
              {row.credentials.map((cred, index) => (
                <li key={index}>
                  <strong>{cred.url}</strong>: {cred.creds.map((c) => `${c.username}/${c.password}`).join(', ')}
                </li>
              ))}
            </ul>
          ) : (
            'No Credentials'
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(InfectionCard);
