import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage.js";
import HousePricePredictor from "./HomePricePredictorPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/predict" element={<HousePricePredictor />} />
      </Routes>
    </Router>
  );
}

export default App;