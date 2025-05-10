import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieFeed } from './Components/MovieFeed/MovieFeed';
import { MovieDetails } from './Components/MovieDetails/MovieDetails';
import LoginPage from './Components/LoginPage/LoginPage';
import RegistrationPage from './Components/RegistrationPage/RegistrationPage';
import LogoutPage from './Components/LogoutPage/LogoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieFeed />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
