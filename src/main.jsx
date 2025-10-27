import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Dashboard from './pages/Dashboard.jsx';
import Dashboardx from './pages/dashboardx.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* <Dashboardx />  */}
      <Dashboard />
  </StrictMode>
)
