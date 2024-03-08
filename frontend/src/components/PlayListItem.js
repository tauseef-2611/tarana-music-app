import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Marquee from 'react-fast-marquee';
import { NavLink } from 'react-router-dom';
import './PlayListItem.css';
import RingLoader from 'react-spinners/RingLoader';

const PlayListItem = () => {
  const [musicList, setMusicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch music data by category
    const fetchMusicByCategory = async () => {
      try {
        console.log('CONNECT_URL:', process.env.REACT_APP_URL);

        // const response = await fetch(`http://localhost:8000/music/category/${category}`);
        const response = await fetch(`${process.env.REACT_APP_URL}/playlists`);
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

    fetchMusicByCategory();
  }, []);

  return (
    <div>
      {isLoading ? (
        <RingLoader color={'#d10d68'} loading={isLoading} size={80} aria-label="Loading Spinner" />
      ) : (
        <>
        <h1 className='plist-head'>Albums</h1>
        <div className='plist-item-container'>
        {musicList.map((PlayListItem) => (
          <div className="plist-item" key={PlayListItem._id}>
              <div className="text-content">

              <h5 className="plist-title">
                  {PlayListItem.Name}
              </h5>
              <h5 className="plist-description">
                  {PlayListItem.Description}
              </h5>
            </div>
            <div className="pbuttons">
              <NavLink to={`/playlist/${PlayListItem._id}`}>
                <button className="list-btns">
                  <FontAwesomeIcon icon={faPlay} id="play-button" />
                </button>
              </NavLink>
            </div>
          </div>
        ))}
        </div>
        </>

      )}
    </div>
  );
};

export default PlayListItem;
