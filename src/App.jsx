import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RandomUser from "./routes/random-user/RandomUser";
import RandomJokes from "./routes/random-jokes/RandomJokes";
import CatsListing from "./routes/cats-listing/CatsListing";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/random-user" />} />
          <Route path="/random-user" element={<RandomUser />} />
          <Route path="/random-jokes" element={<RandomJokes />} />
          <Route path="/cats-listing" element={<CatsListing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
