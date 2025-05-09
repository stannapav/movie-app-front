import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieFeed } from './Components/MovieFeed/MovieFeed';
import { MovieDetails } from './Components/MovieDetails/MovieDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieFeed />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
