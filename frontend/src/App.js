import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Component/layout/Sidebar/Sidebar';
import Footer from './Component/layout/Footer/Footer';
import Home from './Component/Home/Home';
import Profile from './pages/Profile';
import Product from './pages/Product';
import './App.css'
function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Profile />} />
        <Route path="/product" element={<Product />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
