import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './pages/Dashboard.jsx';
import Statistic from './pages/statistic.jsx';
import Layout from './components/Layout.jsx';
import Driverx from './components/Driverx.jsx';
import Reserv from './pages/Reservation.jsx';
import FormTaxi from './pages/FormTaxi.jsx';
import Ajout_Voiture from './pages/FormAjoutVoiture.jsx';
import FormLocation from './pages/FormLocation.jsx';
import Details from './pages/details.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="statistic" element={<Statistic />} />
    <Route path="driverx" element={<Driverx />} />
    <Route path="reservation" element={<Reserv />} />
    <Route path="addriver" element={<FormTaxi />} />
    <Route path="addvoiture" element={<Ajout_Voiture />} />
    <Route path="addvoiture/reservation" element={<Reserv />} />
    <Route path="reservation/form-location" element={<FormLocation />} />
    <Route path="reservation/form-location/reservation" element={<Ajout_Voiture />} />
    <Route path="reservation/details/:id" element={<Details />} />
  </Route>
</Routes>

      </BrowserRouter>
  </StrictMode>
)
