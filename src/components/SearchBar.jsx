import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

let debounceTimeout;

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [characters, setCharacters] = useState([]);

  // Fetch all characters from the API
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
        console.log("Characters loaded:", allCharacters); // Log to check when characters are fetched
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchAllCharacters();
  }, []);

  // Handle search input changes with debouncing
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    console.log("User typed:", query);

    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout for debouncing
    if (query) {
      debounceTimeout = setTimeout(() => {
        console.log("Debounced query:", query); // Log to see the query after the debounce delay
        const filteredSuggestions = characters.filter((character) =>
          character.name.toLowerCase().includes(query.toLowerCase())
        );
        console.log("Filtered suggestions:", filteredSuggestions);
        setSuggestions(filteredSuggestions);
      }, 2000);
    } else {
      setSuggestions([]);
    }
  };

  // Trigger search and clear suggestions
  const handleSearch = () => {
    console.log("Search triggered for:", searchQuery); // Log the query when the search button is clicked or Enter is pressed
    onSearch(searchQuery);
    setSuggestions([]);
  };

  // Handle pressing "Enter"
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion.name); // Log the selected suggestion
    setSearchQuery(suggestion.name);
    onSearch(suggestion.name);
    setSuggestions([]);
  };

  return (
    <div>
      {/* Search Input Section */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for characters..."
          className="w-full p-3 pl-12 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 shadow-sm"
        />
        <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border text-blue-700 border-gray-200 rounded-lg mt-2 z-10 max-h-60 overflow-y-auto shadow-md">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
