import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './style.css';
// import './card.css';
const MusicCard = ({ music }) => (
  <div className="l-card" key={music._id}>
    <img className="l-background-image" src={music.Cover} alt={`Background Image for ${music.Title}`} />
    <div className="l-gradient-layer"></div>
    <div className="l-content">
      <div className="l-text-content">
        <h5>{music.Title}</h5>
        <p>{music.Artist}</p>
      </div>
      {/* Use Link to navigate to the MusicPlayer component with the specific ID */}
      <Link to={`/musicplayer/${music._id}`}>
        <button id='l-play-icon'>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </Link>
    </div>
  </div>
);

export default MusicCard;