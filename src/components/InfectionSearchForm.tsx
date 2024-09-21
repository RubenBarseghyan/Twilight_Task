import React, { useState, useMemo } from 'react';
import { Box, TextField, Button, Snackbar, Alert, Typography } from '@mui/material';

interface InfectionSearchFormProps {
  onSearch: (domain: string) => Promise<void>;
}

const InfectionSearchForm: React.FC<InfectionSearchFormProps> = ({ onSearch }) => {
  const [domain, setDomain] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Domain validation regex: accepts domains like example.com, subdomain.example.com, etc.
  const domainRegex = useMemo(() => /^(?!:\/\/)([a-zA-Z0-9-_]+\.)?[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (!domainRegex.test(domain)) {
      setValidationError('Invalid domain format. Please enter a valid domain.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSearch(domain);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Domain Search
      </Typography>

      <TextField
        label="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        fullWidth
        placeholder="example.com"
        required
        disabled={loading}
        error={!!validationError}
        helperText={validationError || ''}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading || !domain}
      >
        {loading ? 'Searching...' : 'Search Domain'}
      </Button>

      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(InfectionSearchForm);
