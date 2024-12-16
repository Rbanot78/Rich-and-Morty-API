import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaTv,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import SearchBar from "./SearchBar";

const fetchAllCharacters = async () => {
  const allCharacters = [];
  let nextPage = "https://rickandmortyapi.com/api/character";

  try {
    while (nextPage) {
      const response = await axios.get(nextPage);
      const { results, info } = response.data;

      // Add current page's characters to the allCharacters array
      allCharacters.push(...results);

      // Update nextPage to the next URL or null if no more pages
      nextPage = info.next;
    }

    return allCharacters;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
};

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [locations, setLocations] = useState([]);

  // Fetch all characters on mount
  useEffect(() => {
    const fetchData = async () => {
      const allCharacters = await fetchAllCharacters();
      setCharacters(allCharacters);
      setFilteredCharacters(allCharacters);
    };
    fetchData();
  }, []);

  // Fetch locations from the API
  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((response) => {
        setLocations(response.data.results);
      })
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);

  // Handle search functionality
  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Handle species filter change
  const handleSpeciesFilterChange = (e) => {
    setSpeciesFilter(e.target.value);
  };

  // Filter characters based on search term, status, and species
  useEffect(() => {
    let filtered = characters;

    if (searchTerm) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (character) =>
          character.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (speciesFilter) {
      filtered = filtered.filter((character) =>
        character.species.toLowerCase().includes(speciesFilter.toLowerCase())
      );
    }

    setFilteredCharacters(filtered);
    setCurrentPage(0);
  }, [searchTerm, statusFilter, speciesFilter, characters]);

  // Pagination Logic
  const charactersPerPage = 6;
  const displayedCharacters = filteredCharacters.slice(
    currentPage * charactersPerPage,
    (currentPage + 1) * charactersPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * charactersPerPage < filteredCharacters.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      {/* Header Section */}
      <header className="py-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-teal-400 to-purple-600 text-transparent bg-clip-text">
          Rick and Morty Explorer
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-300">
          Discover characters from the multiverse
        </p>
      </header>

      {/* Search Bar */}
      <div className="flex flex-col items-center space-y-6 mb-10 px-4 sm:px-8">
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-wrap justify-center space-x-4 gap-y-4">
          <Link to="/episodebrower">
            <button className="flex items-center bg-gradient-to-r from-teal-400 to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300">
              <FaTv className="mr-2" />
              Episodes List
            </button>
          </Link>
          <Link to="/compare">
            <button className="flex items-center bg-gradient-to-r from-teal-400 to-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:scale-105 transform transition duration-300">
              <FaArrowRight className="mr-2" />
              Comparison
            </button>
          </Link>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap justify-center space-x-8 mb-8 px-4 sm:px-8">
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none mb-4 sm:mb-0"
        >
          <option value="">Filter by Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          value={speciesFilter}
          onChange={handleSpeciesFilterChange}
          className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none  mb-4 sm:mb-0 "
        >
          <option value="">Filter by Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Cronenberg">Cronenberg</option>
        </select>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-8 mb-10">
        {displayedCharacters.map((character) => (
          <Link
            key={character.id}
            to={`/character/${character.id}`} // Link to character details
            className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            {/* Character Image */}
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-46 sm:h-64 lg:h-72 object-cover"
            />
            <div className="p-4">
              {/* Character Name */}
              <h2 className="text-2xl font-bold mb-2 text-teal-400">
                {character.name}
              </h2>
              {/* Status with Icon */}
              <div className="flex items-center space-x-2 mb-2">
                {character.status.toLowerCase() === "alive" ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaTimesCircle className="text-red-500" />
                )}
                <p className="text-gray-300">{character.status}</p>
              </div>
            </div>

            {/* Hover Details */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-lg font-bold text-white">
                {character.species}
              </p>
              {character.location && (
                <p className="text-sm text-gray-400">{`Last Known Location: ${character.location.name}`}</p>
              )}
              {character.origin && (
                <p className="text-sm text-gray-400">{`First Seen In: ${character.origin.name}`}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 pb-12">
        <button
          onClick={handlePreviousPage}
          className={`px-6 py-2 text-lg font-semibold rounded-full bg-gray-700 hover:bg-gray-600 transition ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className={`px-6 py-2 text-lg font-semibold rounded-full bg-gray-700 hover:bg-gray-600 transition ${
            (currentPage + 1) * charactersPerPage >= filteredCharacters.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={
            (currentPage + 1) * charactersPerPage >= filteredCharacters.length
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
