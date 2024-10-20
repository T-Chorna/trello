import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Board } from './pages/Board/Board';
import { Home } from './pages/Home/Home';

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="board">
        <Route path=":board_id" element={<Board />} />
      </Route>
    </Routes>
  </Router>
  );
}




