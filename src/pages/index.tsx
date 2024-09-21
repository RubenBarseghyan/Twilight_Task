import React, { useState, useCallback, useMemo } from 'react';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import InfectionSearchForm from '../components/InfectionSearchForm';
import InfectionResultsTable from '../components/InfectionResultsTable';
import { searchInfections } from '../services/apiService';
import { ApiResponse, DataItem, SearchData } from '../interfaces/dataInterfaces';
import axios from 'axios';

const Home: React.FC = () => {
  const [results, setResults] = useState<DataItem[]>([]);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [creditsConsumed, setCreditsConsumed] = useState<number>(0);
  const [creditsLeft, setCreditsLeft] = useState<number>(0);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [searchData, setSearchData] = useState<SearchData | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [emptyResults, setEmptyResults] = useState<boolean>(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setEmptyResults(false);
  };

  const handleSearch = useCallback(async (domain: string) => {
    const searchRequestData: SearchData = {
      domains: [domain],
      size: 25,
    };
    setSearchData(searchRequestData);

    try {
      const response: ApiResponse = await searchInfections(searchRequestData);
      setResults(response.data);
      setNextToken(response?.next || null);
      setCreditsConsumed(response.search_consumed_credits);
      setCreditsLeft(response.credits_left);
      setTotalItems(response.total_items_count);
      setItemsCount(response.items_count);

      if (response.data.length === 0) {
        setEmptyResults(true);
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      setSnackbarOpen(true);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (nextToken && searchData) {
      const updatedSearchData: SearchData = { ...searchData, next: nextToken };
      try {
        const response: ApiResponse = await searchInfections(updatedSearchData);
        setResults((prevResults) => [...prevResults, ...response.data]);
        setNextToken(response.next || null);
        setItemsCount(response.items_count);

        if (response.data.length === 0) {
          setEmptyResults(true);
          setSnackbarOpen(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || 'An error occurred while loading more results.');
        } else {
          setError('An error occurred while loading more results.');
        }
        setSnackbarOpen(true);
      }
    }
  }, [nextToken, searchData]);

  const memoizedTable = useMemo(() => (
    <InfectionResultsTable
      data={results}
      nextToken={nextToken}
      onLoadMore={handleLoadMore}
      totalItems={totalItems}
      itemsCount={itemsCount}
      creditsConsumed={creditsConsumed}
      creditsLeft={creditsLeft}
    />
  ), [results, nextToken, handleLoadMore, totalItems, itemsCount, creditsConsumed, creditsLeft]);

  return (
    <Container>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          margin: '8px',
          padding: '8px',
          boxShadow: 1,
        }}
      >
        <InfectionSearchForm onSearch={handleSearch} />
      </Box>

      <Box sx={{ marginTop: '16px' }}>
        {memoizedTable}
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={error ? 'error' : 'info'} sx={{ width: '100%' }}>
          {error || (emptyResults && 'No results found for the current query.')}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default React.memo(Home);
