import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import LandingPage from './components/LandingPage';
import TrafficViolationList from './components/TrafficViolationList';
import PaymentOptions from './components/PaymentOptions';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/traffic-violations" element={<TrafficViolationList />} />
          <Route path="/payment-options" element={<PaymentOptions />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
