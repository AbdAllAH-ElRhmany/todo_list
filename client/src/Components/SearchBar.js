import React, { useState } from 'react';
// import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search tasks by title or description..."
            className="input"
        />
    );
};

export default SearchBar;
