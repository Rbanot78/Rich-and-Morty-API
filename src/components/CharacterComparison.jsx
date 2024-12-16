import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const CharacterComparison = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter1, setSelectedCharacter1] = useState(null);
  const [selectedCharacter2, setSelectedCharacter2] = useState(null);

  // Fetch all characters using pagination
  useEffect(() => {
    const fetchAllCharacters = async () => {
      const allCharacters = [];
      let nextPage = "https://rickandmortyapi.com/api/character";

      try {
        while (nextPage) {
          const response = await axios.get(nextPage);
          const { results, info } = response.data;

          allCharacters.push(...results);
          nextPage = info.next;
        }
        setCharacters(allCharacters);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchAllCharacters();
  }, []);

  // Handle character selection
  const handleCharacterSelect = (character, index) => {
    if (index === 1) {
      setSelectedCharacter1(character);
    } else if (index === 2) {
      setSelectedCharacter2(character);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="text-blue-400 hover:underline flex items-center mb-6 transition duration-300 ease-in-out transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" />
        </Link>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Character Comparison
        </h1>

        {/* Character Selection */}
        <div className="flex flex-col sm:flex-row sm:space-x-6 justify-center mb-8">
          {/* Character 1 Selection */}
          <div className="flex flex-col mb-6 sm:mb-0 w-full sm:w-1/2">
            <label
              htmlFor="character1"
              className="text-lg font-semibold text-white text-center mb-2"
            >
              Select Character 1
            </label>
            <select
              id="character1"
              onChange={(e) =>
                handleCharacterSelect(characters[e.target.selectedIndex - 1], 1)
              }
              className="p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <option value="">Select a character</option>
              {characters.map((character) => (
                <option key={character.id} value={character.name}>
                  {character.name}
                </option>
              ))}
            </select>
          </div>

          {/* Character 2 Selection */}
          <div className="flex flex-col w-full sm:w-1/2">
            <label
              htmlFor="character2"
              className="text-lg font-semibold text-center text-white mb-2"
            >
              Select Character 2
            </label>
            <select
              id="character2"
              onChange={(e) =>
                handleCharacterSelect(characters[e.target.selectedIndex - 1], 2)
              }
              className="p-3 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <option value="">Select a character</option>
              {characters.map((character) => (
                <option key={character.id} value={character.name}>
                  {character.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Character Comparison */}
        {selectedCharacter1 && selectedCharacter2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 sm:px-8">
            {/* Character 1 Details */}
            <div className="bg-gradient-to-br from-blue-800 to-purple-800 border border-gray-600 rounded-lg p-6 shadow-xl hover:shadow-2xl transform transition duration-500 hover:scale-105">
              <h2 className="text-lg font-semibold text-center text-white mb-4">
                Character 1
              </h2>
              <div className="flex items-center justify-center sm:justify-start">
                {/* Character 1 Image */}
                <img
                  src={selectedCharacter1.image}
                  alt={selectedCharacter1.name}
                  className="w-24 h-24 rounded-full mr-4 shadow-md"
                />
                {/* Character 1 Details */}
                <div className="text-white space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Name:</span>{" "}
                    {selectedCharacter1.name}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedCharacter1.status}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Species:</span>{" "}
                    {selectedCharacter1.species}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Gender:</span>{" "}
                    {selectedCharacter1.gender}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Origin:</span>{" "}
                    {selectedCharacter1.origin.name}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Location:</span>{" "}
                    {selectedCharacter1.location.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Character 2 Details */}
            <div className="bg-gradient-to-br from-blue-800 to-purple-800 border border-gray-600 rounded-lg p-6 shadow-xl hover:shadow-2xl transform transition duration-500 hover:scale-105">
              <h2 className="text-lg font-semibold text-center text-white mb-4">
                Character 2
              </h2>
              <div className="flex items-center justify-center sm:justify-start">
                {/* Character 2 Image */}
                <img
                  src={selectedCharacter2.image}
                  alt={selectedCharacter2.name}
                  className="w-24 h-24 rounded-full mr-4 shadow-md"
                />
                {/* Character 2 Details */}
                <div className="text-white space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold">Name:</span>{" "}
                    {selectedCharacter2.name}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Status:</span>{" "}
                    {selectedCharacter2.status}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Species:</span>{" "}
                    {selectedCharacter2.species}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Gender:</span>{" "}
                    {selectedCharacter2.gender}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Origin:</span>{" "}
                    {selectedCharacter2.origin.name}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Location:</span>{" "}
                    {selectedCharacter2.location.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterComparison;
