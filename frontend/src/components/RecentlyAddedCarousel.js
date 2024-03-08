import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import RingLoader from 'react-spinners/RingLoader';

const RecentlyAddedCarousel = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyAdded = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/music/recently-added`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRecentlyAdded(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recently added music:', error.message);
      }
    };

    fetchRecentlyAdded();
  }, []);

  return (
    <div className="carousel-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="centered-loader">
            <RingLoader color={"#d10d68"} loading={isLoading} size={80} aria-label="Loading Spinner" />
          </div>
        </div>
      ) : (
        <>
          <div className="gradient-mask"></div>
          <h2 className="carousel-title">Recently Added</h2>
          <div className="carousel">
            {recentlyAdded.map((music) => (
              <div className="card" key={music.id}>
                <img className="background-image" src={music.Cover} alt="Background Image" />
                <div className="gradient-layer"></div>
                <Link to={`/musicplayer/${music._id}`}>
                  <div className="content">
                    <div className="text-content">
                      <h5>{music.Title}</h5>
                      <p>{music.Artist}</p>
                    </div>
                    <button>
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentlyAddedCarousel;
