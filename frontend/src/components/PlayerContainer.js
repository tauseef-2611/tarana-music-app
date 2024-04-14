import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPlay, faPause, faListDots, faHeart, faShuffle } from '@fortawesome/free-solid-svg-icons';

const PlayerContainer = ({ musicDetails, onMusicCompletion }) => {
  const [isPlaying, setIsPlaying] = useState(!musicDetails.autoPlay);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState('0:00');
  const [endTime, setEndTime] = useState('3:30');
  const [isSwitched, setSwitch] = useState(false);
  const audioRef = React.createRef();

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const progressPercentage = (currentTime / duration) * 100;

      setProgress(progressPercentage);

      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);

      setStartTime(`${minutes}:${seconds}`);
    };

    const handleLoadedMetadata = () => {
      const duration = audio.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

      setEndTime(`${minutes}:${seconds}`);
    };

    const handleEnded = () => {
      if (onMusicCompletion) {
        onMusicCompletion();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, onMusicCompletion]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newProgress = (e.clientX / window.innerWidth) * 100;
    audio.currentTime = (newProgress / 100) * audio.duration;
  };

  const handleBackward = () => {
    const audio = audioRef.current;
    audio.currentTime -= 10; // Go back 10 seconds
  };

  const handleForward = () => {
    const audio = audioRef.current;
    audio.currentTime += 10; // Go forward 10 seconds
  };

  const handleToggle = () => {
    setSwitch(!isSwitched);
  };

  return (
    <div className="player-container">
      <img src={musicDetails.Cover} alt="Music Cover Image" />
      <audio ref={audioRef} src={musicDetails.Link} autoPlay />
      <div className="player-text">
        <h5 id="player-title">{musicDetails.Title}</h5>
        <p id="player-description">{musicDetails.Artist}</p>
      </div>
      <div className="progress-bar" onClick={handleProgressChange}>
        <div style={{ width: `${progress}%` }}></div>
      </div>
      <div className="timestamps">
        <span>{startTime}</span>
        <span>{endTime}</span>
      </div>
      <div className="controls">
        <button id="detail-button" onClick={handleToggle}>
          <FontAwesomeIcon icon={faListDots} />
          {isSwitched ? (
            <div className="music-details">
              <h5>{musicDetails.Artist}</h5>
              <p>{musicDetails.Mood}</p>
            </div>
          ) : null}
        </button>
        <div className="player-controls">
          <FontAwesomeIcon icon={faBackward} onClick={handleBackward} />
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} id="playPauseBtn" onClick={handlePlayPause} />
          <FontAwesomeIcon icon={faForward} onClick={handleForward} />
        </div>
        <FontAwesomeIcon icon={faShuffle} onClick={onMusicCompletion} />
      </div>
    </div>
  );
};

export default PlayerContainer;
