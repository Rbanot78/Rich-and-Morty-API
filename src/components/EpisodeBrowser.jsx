import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EpisodeBrowser = () => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
  const [characters, setCharacters] = useState([]);

  // Fetch episodes from the API (including pagination)
  useEffect(() => {
    const fetchEpisodes = async () => {
        try {
            const episodes = [];
            let nextPage = 'https://rickandmortyapi.com/api/episode';

            while (nextPage) {
                const { data } = await axios.get(nextPage);
                episodes.push(...data.results);
                nextPage = data.info.next;
            }

            setEpisodes(episodes);
        } catch (error) {
            console.error('Error fetching episodes:', error);
        }
    };

    fetchEpisodes();
}, []);


  // Fetch characters for a specific episode
  const handleEpisodeClick = (episodeId) => {
    if (selectedEpisodeId === episodeId) {
      setSelectedEpisodeId(null);
      setCharacters([]);
      return;
    }
  
    setSelectedEpisodeId(episodeId);
  
    axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then(response => {
        const characterPromises = response.data.characters.map(url => axios.get(url));
        return Promise.all(characterPromises); 
      })
      .then(results => {
        setCharacters(results.map(result => result.data));
      })
      .catch(console.error); // Shortened error handling
  };
  
  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text mb-12">
          Explore Rick and Morty Episodes
        </h1>

        {/* Home Button */}
        <div className="mb-8 flex justify-center">
          <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-200">
            Home
          </Link>
        </div>

        {/* Episode List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {episodes.map((episode, index) => (
            <div 
              key={episode.id} 
              onClick={() => handleEpisodeClick(episode.id)} 
              className="cursor-pointer bg-white p-6 border rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 hover:bg-gradient-to-r from-green-300 to-blue-300"
            >
              <h2 className="text-lg font-bold text-gray-800">Episode {index + 1}: {episode.name}</h2>
              <p className="text-sm text-gray-600">Air Date: {episode.air_date}</p>
            </div>
          ))}
        </div>

        {/* Episode Details Section */}
        {selectedEpisodeId && (
          <div className="mt-12 p-8 bg-white rounded-xl shadow-lg">
            {episodes
              .filter((episode) => episode.id === selectedEpisodeId)
              .map((episode) => (
                <div key={episode.id}>
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">{episode.name}</h2>
                  <p className="text-lg text-gray-600 mb-8"><strong>Air Date:</strong> {episode.air_date}</p>

                  {/* Characters List */}
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Characters in this Episode:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {characters.map((character) => (
                      <Link to={`/character/${character.id}`} key={character.id} className="group bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105">
                        <img
                          src={character.image}
                          alt={character.name}
                          className="w-24 h-24 object-cover rounded-full mb-4 mx-auto group-hover:opacity-80"
                        />
                        <p className="text-center text-lg font-medium text-gray-800 group-hover:text-blue-600">
                          {character.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeBrowser;
