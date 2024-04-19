import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './style.css';
// import './card.css';
const MusicCard = ({ music }) => (
  <div className="l-card" key={music._id}>
    <img className="l-background-image" src={music.Cover} alt={`Background Image for ${music.Title}`} onError={(e) => {e.target.onerror = null; e.target.src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMG1vdW50YWlufGVufDB8fDB8fHww"}}/>
                <div className="gradient-layer"></div>
    <div className="l-gradient-layer"></div>
    <div className="l-content">
      <div className="l-text-content">
      <h5>{music.Title.length > 22 ? `${music.Title.substring(0, 22)}...` : music.Title}</h5>
      <p>{music.Artist.length > 12 ? `${music.Artist.substring(0, 12)}...` : music.Artist}</p>      
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
