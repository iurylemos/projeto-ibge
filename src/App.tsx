import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
