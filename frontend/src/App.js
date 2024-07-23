import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Component/layout/Sidebar/Sidebar";
import Footer from "./Component/layout/Footer/Footer";
import Home from "./Component/Home/Home";
import Profile from "./pages/Profile";
import "./App.css";
import ProductDetails from "./Component/Product/ProductDetails";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
