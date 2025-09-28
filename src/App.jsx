import { Routes, Route, NavLink } from "react-router-dom";
import Interviewee from "./Components/Pages/Interviewee";
import Interviewer from "./Components/Pages/Interviewer";
import Home from "./Components/Pages/Home";
import './App.css';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>AI Interview Assistant</h1>
        <nav>
          <NavLink
            to="/" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/interviewee" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Interviewee
          </NavLink>
          <NavLink
            to="/interviewer" 
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Interviewer
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interviewee" element={<Interviewee />} />
          <Route path="/interviewer" element={<Interviewer />} />
        </Routes>
      </main>
    </div>
  );
}
