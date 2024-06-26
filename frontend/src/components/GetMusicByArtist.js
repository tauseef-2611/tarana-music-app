import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MusicCard from './MusicCard';
import { useParams } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import './style.css';

const GetMusicByArtist = ({ }) => {
  let { artist } = useParams();
  const [musicList, setMusicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch music data by Artist
    const fetchMusicByArtist = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/music/artist/${artist}`);
        // const response = await fetch(`http://localhost:8000/music/most-played`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data);
        setMusicList(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(`Error fetching ${artist} music:`, error.message);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchMusicByArtist();
  }, [artist]);

  return (
    <div className="card-grid-title">
      <h2>{artist}</h2>
      {isLoading ? (
        <div className="loading-container">
          <div className="centered-loader">
            <RingLoader color={'#d10d68'} loading={isLoading} size={80} aria-label="Loading Spinner" />
          </div>
        </div>
      ) : (
        <div className="l-card-grid">
          {musicList.map((music) => (
            <MusicCard key={music._id} music={music} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GetMusicByArtist;
