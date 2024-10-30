import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const handleSearch = (e) => {
        setQuery(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };


    return (
        <input
            type="text"
            placeholder="Buscar eventos"
            value={query}
            onChange={handleSearch}
            className="w-full p-3 border border-red-500 rounded mb-4 outline-none focus:border-red-600"
        />
    );
}

export default SearchBar;
