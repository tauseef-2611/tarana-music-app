import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import MusicCard from './MusicCard';
import ListItem from './ListItem'; // Import ListItem component
import RingLoader from 'react-spinners/RingLoader';
import './style.css';
import Marquee from "react-fast-marquee";

const GetMusicByPlaylist = () => {
  let { id } = useParams(); // Get id from the URL parameters
  const [musicList, setMusicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch music data by Playlist
    const fetchMusicByPlaylist = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/playlist/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMusicList(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(`Error fetching music:`, error.message);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchMusicByPlaylist();
  }, [id]);

  return (
    <>
    <div className="card-grid-title">
      <h2>{musicList.Name}</h2>
      <p style={{fontWeight:'lighter'}}>{musicList.Description}</p>
      {isLoading ? (
        <div className="loading-container">
          <div className="centered-loader">
            <RingLoader color={'#d10d68'} loading={isLoading} size={80} aria-label="Loading Spinner" />
          </div>
        </div>
      ) : (
        <div className="l-card-grid">
          {musicList.Music.map((music) => (
            <ListItem key={music._id} music={music} />
          ))}
        </div>     
     
      )}
    </div>
    </>
  );
};

export default GetMusicByPlaylist;