import React, { useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPlay, faPause, faListDots, faClockRotateLeft, faShare } from '@fortawesome/free-solid-svg-icons';

const PlayerContainer = ({ musicDetails, getNextMusic,getPrevMusic, currentRef, validRef }) => {
  const [isPlaying, setIsPlaying] = useState(!musicDetails.autoPlay);
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState('0:00');
  const [endTime, setEndTime] = useState('3:30');
  const [isSwitched, setSwitch] = useState(false);
  const audioRef = React.createRef();
  // const getCurrentRef = () => audioRef.current;

  useEffect(() => {
    const audio = audioRef.current;
    currentRef(audio);

    const handleTimeUpdate = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const progressPercentage = (currentTime / duration) * 100;

      setProgress(progressPercentage);

      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      setStartTime(`${formattedMinutes}:${formattedSeconds}`);
    };

    const handleLoadedMetadata = () => {
      const duration = audio.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  setEndTime(`${formattedMinutes}:${formattedSeconds}`);
      //check if music is ended

    
    };


    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', getNextMusic);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', getNextMusic);
      }
    };


  }, [audioRef]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      // navigator.mediaSession.setActionHandler('play', () => {
      //   handlePlayPause();
      // });
      // navigator.mediaSession.setActionHandler('pause', () => {
      //   handlePlayPause();
      // });
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `Now playing: ${musicDetails.Title}`,
        artist: musicDetails.Artist,
        poet: musicDetails.Poet,
        artwork: [
          { src: musicDetails.Cover, sizes: '96x96', type: 'image/png' },
          { src: musicDetails.Cover, sizes: '128x128', type: 'image/png' },
          { src: musicDetails.Cover, sizes: '192x192', type: 'image/png' },
          { src: musicDetails.Cover, sizes: '256x256', type: 'image/png' },
          { src: musicDetails.Cover, sizes: '384x384', type: 'image/png' },
          { src: musicDetails.Cover, sizes: '512x512', type: 'image/png' },
        ]});
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        getPrevMusic();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        getNextMusic();
      });
    }
    document.title = musicDetails.Title+' | tarana.app';
  }, [musicDetails, getNextMusic, getPrevMusic]);


  const handlePlayPause = async() => {
    const audio = audioRef.current;
    if (isPlaying) {
      await audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const progressBar = e.target;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const width = rect.width;
    const newProgress = (x / width) * 100;
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

  const [isDragging, setIsDragging] = useState(false);

const handleMouseDown = (e) => {
  setIsDragging(true);
  handleProgressChange(e);
};

const handleMouseMove = (e) => {
  if (isDragging) {
    handleProgressChange(e);
  }
};

const handleMouseUp = () => {
  setIsDragging(false);
};


  return (
    <div className="player-container">
      
      <img src={musicDetails.Cover} alt="Tarana Cover Image" />
      <audio ref={validRef ? validRef : audioRef} src={musicDetails.Link} autoPlay />
      <div className="player-text">
        <h5 id="player-title">{musicDetails.Title}</h5>
        <p id="player-description">{musicDetails.Artist}</p>
      </div>
      <div className="progress-bar" onClick={handleProgressChange}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      >
      <div style={{ width: `${progress}%` }} className="progress">
        <span className="progress-circle"></span>
      </div>
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
              <p className='music-details-p'>Poet: {musicDetails.Poet}</p>
              <p className='music-details-p'>Artist: {musicDetails.Artist}</p>
              <p className='music-details-p'>Category: {musicDetails.Category}</p>
              <p className='music-details-p' > Disclaimer:
              We do not claim ownership of any songs featured on this platform. All rights to the music belong to their respective owners.
              </p>
              <p className='music-details-p' > Reference: {musicDetails.Reference ? musicDetails.Reference : 'Not Available'}
              </p></div>
          ) : null}
        </button>

        <FontAwesomeIcon icon={faClockRotateLeft} onClick={handleBackward} />

        <div className="player-controls">
          <FontAwesomeIcon icon={faBackward} onClick={getPrevMusic} />
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} id="playPauseBtn" onClick={handlePlayPause} />
          <FontAwesomeIcon icon={faForward} onClick={getNextMusic} />
        </div>
        <FontAwesomeIcon icon={faClockRotateLeft} flip={'horizontal'}onClick={handleForward} />
        <FontAwesomeIcon icon={faShare} onClick={async () => {
          if (navigator.share) {
            try {
              await navigator.share({
                title: 'Check out this tarana!',
                text: `Now playing: ${musicDetails.Title} by ${musicDetails.Artist}`,
                Cover: musicDetails.Cover,
                url: window.location.href
              });
            } catch (error) {
              console.error('Error sharing:', error);
            }
          } else {
            console.log('Web Share API not supported.');
          }
        }} />    
  </div>
    </div>
  );
};

export default PlayerContainer;
