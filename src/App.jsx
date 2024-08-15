import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RandomUser from "./pages/RandomUser";
import RandomJokes from "./pages/RandomJokes";
import CatsListing from "./pages/CatsListing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/random-user" />} />
        <Route path="/random-user" element={<RandomUser />} />
        <Route path="/random-jokes" element={<RandomJokes />} />
        <Route path="/cats-listing" element={<CatsListing />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
