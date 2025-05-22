import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reg from '../page/reg';
import Home from '../page/Home';

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Reg />} />
        <Route path="/login" element={<Reg />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRoute;