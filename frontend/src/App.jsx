// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoinListPage from "./pages/CoinListPage";
import CoinDetailPage from "./pages/CoinDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoinListPage />} />
        <Route path="/coin/:id" element={<CoinDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
