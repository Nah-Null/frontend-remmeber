import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reg from '../page/reg';
import Home from '../page/Home';
import Management from '../page/management';

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Reg />} />
        <Route path="/login" element={<Reg />} />
        <Route path="/home" element={<Home />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </Router>
  );
}

export default AppRoute;