// src/components/MusicSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './search.css'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MusicCard from './MusicCard';
const MusicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/music/search?term=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Avoid making a request for an empty search term
    if (searchTerm.trim() !== null) {
      fetchData();
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
<div className='search-results-container'>
    <div className='search'>
        <div className='search-box'>
      <input
        type="text"
        placeholder="Search Tarane.."
        value={searchTerm}
        onChange={handleInputChange}
        className='search-input'
      />
      <FontAwesomeIcon icon={faSearch} />
</div>
      {searchResults.length > 0 && (
    <div className="search-results">
    {searchResults.map((result) => (
            <MusicCard key={result._id} music={result} />
          ))}
</div>      )}
</div>
<div className='space'
        style={{height:'100px'}}
        ></div>
    </div>

  );
}

export default MusicSearch;
