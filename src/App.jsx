import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CharacterDetailsPage from './components/CharacterDetailsPage';
import EpisodeBrowser from './components/EpisodeBrowser';
import CharacterComparison from './components/CharacterComparison';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterDetailsPage />} />
          <Route path="/episodes/:id" element={<EpisodeBrowser />} />
          <Route path="/episodebrower" element={<EpisodeBrowser />} />
          <Route path="/compare" element={<CharacterComparison />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
