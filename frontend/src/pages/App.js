import React from 'react'
import Sidebar from './Component/Sidebar'
import {BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Product from './pages/Product'
import './App.css'
function App() {
  return (
    <>
      <Router>
      <Sidebar/>
      <Routes path='/' exact Component={Home} />
      <Routes path='/report'  Component={Profile} />
      <Routes path='/products'  Component={Product} />
      </Router>
    </>
  )
}

export default App