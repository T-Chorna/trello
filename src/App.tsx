import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Board } from './pages/Board/Board';
import { Home } from './pages/Home/Home';

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/board/:board_id" element={<Board />} /> */}
      <Route path="board">
        <Route path=":board_id" element={<Board />} />
      </Route>
    </Routes>
  </Router>
  );
}




