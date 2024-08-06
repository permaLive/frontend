import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search box"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="search-button">🔍</button>
    </div>
  );
};

export default SearchBar;
