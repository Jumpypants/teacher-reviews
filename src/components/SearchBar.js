import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

const SearchBar = ({ teachers, onSearchResults, onClearSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fuse, setFuse] = useState(null);

  // Initialize Fuse.js when teachers data changes
  useEffect(() => {
    if (teachers && teachers.length > 0) {
      const fuseOptions = {
        keys: [
          { name: "name", weight: 0.6 },
          { name: "school", weight: 0.3 },
          { name: "subjects", weight: 0.1 }
        ],
        threshold: 0.4, // Lower = more strict matching
        includeScore: true,
        minMatchCharLength: 2
      };

      const fuseInstance = new Fuse(teachers, fuseOptions);
      setFuse(fuseInstance);
    }
  }, [teachers]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      // Clear search - show all teachers
      onClearSearch();
    } else if (fuse && value.length >= 2) {
      // Perform fuzzy search
      const results = fuse.search(value);
      const filteredTeachers = results.map(result => result.item);
      onSearchResults(filteredTeachers, value);
    }
  };

  // Clear search function
  const clearSearch = () => {
    setSearchTerm("");
    onClearSearch();
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search teachers, schools, or subjects..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="search-clear-btn"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <div className="search-icon">
          🔍
        </div>
      </div>
      {searchTerm && (
        <div className="search-info">
          Searching for: "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
