import React from 'react';
import HomePage from './HomePage';
import { CssBaseline, Container, Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <HomePage />
      </Container>
    </>
  );
};

export default App;
