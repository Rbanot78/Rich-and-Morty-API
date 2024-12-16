import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaTv, FaArrowLeft } from "react-icons/fa";

const CharacterDetailsPage = () => {
  const { id } = useParams(); // Get the character ID from the URL params
  const [character, setCharacter] = useState(null); // State to store the character data

  // Fetch character data on component mount
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => setCharacter(response.data)) // Set character data on success
      .catch((error) => console.log(error)); // Log error if there's an issue with fetching
  }, [id]); // Only re-run when `id` changes

  // If the character data hasn't loaded yet, show a loading message
  if (!character) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Navigation Section */}
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-blue-400 hover:underline flex items-center mb-6 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
          </Link>
        </div>

        {/* Character Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <img
            src={character.image}
            alt={character.name}
            className="w-40 h-40 rounded-full border-4 border-gray-300 shadow-lg"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
              {character.name}
            </h1>
            <p className="text-lg text-gray-600">
              {character.status} - {character.species}
            </p>
            <p className="text-sm text-gray-500">
              Location: {character.location.name}
            </p>
            <p className="text-sm text-gray-500">
              Origin: {character.origin.name}
            </p>
            <p className="text-sm text-gray-500">Gender: {character.gender}</p>
          </div>
        </div>

        {/* Appeared in Episodes Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Appeared in Episodes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {character.episode.map((episodeUrl) => {
              const episodeId = episodeUrl.split("/").pop(); // Extract episode ID from URL
              return (
                <div
                  key={episodeId}
                  className="transition transform hover:scale-105 hover:text-blue-700 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg"
                >
                  <Link
                    to={`/episodes/${episodeId}`} // Link to episode details page
                    className="flex items-center justify-between text-blue-500 font-medium"
                  >
                    <span>Episode {episodeId}</span>
                    <FaTv className="w-5 h-5 text-blue-500" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
