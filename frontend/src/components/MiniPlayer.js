import React, { useState, useEffect,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faBackward,faPause,faForward, faArrowCircleUp, faArrowUp, faArrowUpAZ, faAngleUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';import { useNavigate } from 'react-router-dom';
import './MiniPlayer.css'; // Import the CSS file

function MiniPlayer({ musicDetails,closePlayer }) {
  const audioref = useRef(null); // Create a ref for the audio element

  useEffect(() => {
    if (audioref.current && musicDetails.currentRef) {
      audioref.current.currentTime = musicDetails.currentRef.currentTime; // Set the currentTime of the audio element
      audioref.current.play(); // Start playing the audio
    }
  }, [musicDetails.currentRef]);

  const [isPlaying, setIsPlaying] = useState(true);
  const navigate = useNavigate();
  const handleClose = () => {
   closePlayer();
  };

  
  const handlePlayPause = () => {
    // Implement the logic to play or pause the music
    if (audioref.current.paused) {
      setIsPlaying(true);
      audioref.current.play();
    } else {
      setIsPlaying(false);
      audioref.current.pause();
    }
  };

  const handleNext = () => {
    // Implement the logic to play the next music
  };

  const handlePrev = () => {
    // Implement the logic to play the previous music
  };

  const handleOpenPlayer = () => {
    handleClose();
    navigate(`/musicplayer/${musicDetails._id}`, { state: { currentTiming: audioref.current.currentTime, navState: true } });
  
  };

  return (
    <>
    <div className="mini-player">
    <FontAwesomeIcon icon={faXmark} style={{backgroundColor:'rgba(255, 255, 255, 0.2)',padding:'8px',borderRadius:'5px'}} onClick={handleClose} />   
    <audio ref={audioref} src={musicDetails.Link} autoPlay/>
    <div className='mini-player-content'>
      <img className="mini-image" src={musicDetails.Cover} alt="Cover Image 1" />
                <div className="mini-content">
                    <h5 className="mini-title">
                    {musicDetails.Title.length > 24 ? `${musicDetails.Title.substring(0, 24)}...` : musicDetails.Title}                    </h5>
                    <p className="list-description">
                        {musicDetails.Artist}
                    </p>
                </div>
                <div className="buttons-container">
                        
                <div className="player-controls">
          {/* <FontAwesomeIcon icon={faBackward} onClick={handlePrev} /> */}
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className='play-btn' onClick={handlePlayPause} />
          {/* <FontAwesomeIcon icon={faForward} onClick={handleNext} /> */}
        </div>
        </div>
                </div>
                <FontAwesomeIcon icon={faAngleUp} style={{backgroundColor:'rgba(255, 255, 255, 0.2)',padding:'8px',borderRadius:'5px'}} onClick={handleOpenPlayer} />    </div>
    </>
  );
}

export default MiniPlayer;