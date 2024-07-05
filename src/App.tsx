import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './basicpage/Dashboard';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
