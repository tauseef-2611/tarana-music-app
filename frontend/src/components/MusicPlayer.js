import React, { useState, useEffect,  } from 'react';
import { useParams } from 'react-router-dom';
import PlayerContainer from './PlayerContainer';
import LyricsContainer from './LyricsContainer';
import { faToggleOn, faToggleOff,faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import RingLoader from "react-spinners/RingLoader";



const MusicPlayer = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSwitched, setSwitch] = useState(false);
  const [AllMusic, setAllMusic] = useState([]);
  const [musicDetails, setMusicDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let refaudio = React.createRef();
  
  useEffect(() => {
    const fetchMusicDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/music/id/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.log('Content-Type:', contentType);
          throw new Error('Invalid content type. Expected JSON.');
        }
        const allmusic= await axios.get(`${process.env.REACT_APP_URL}/music`);
        const data = await response.json();
        setAllMusic(allmusic.data);        
        setMusicDetails(data);
        //update plays
        try {
          const updatePlays = await axios.put(`${process.env.REACT_APP_URL}/music/update-plays/${id}`);
        } catch (error) {
          throw new Error(`HTTP error! Status: ${error.response.status}`);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching music details:', error.message);
      }
    };


    fetchMusicDetails();
  }, [id]);
  const handleToggle = () => {
    setSwitch(!isSwitched);
  };



  const getNextMusic = async () => {
    setIsLoading(true);
    // Get the current music's category
    const currentMusicCategory = musicDetails?.Category;
    // If there is a category, fetch a random music ID from another category
    if (currentMusicCategory) {
      try {
        const randomMusicId = await getRandomMusic(currentMusicCategory,musicDetails._id);

        if (randomMusicId) {
          // Redirect to the MusicPlayer component with the new random music ID
          navigate(`/musicplayer/${randomMusicId}`);
        } else {
          // Handle the case where there are no other categories or music IDs
          console.log('No other categories or music IDs available');
        }
      } catch (error) {
        console.error('Error fetching random music ID:', error.message);
      }
    }
  };
  
  const getRandomMusic = async (category, currentMusicId) => {
    try {
      // Filter music by category
      const musicByCategory = AllMusic.filter(music => music.Category === category);
    
      // Check if there are musics in the category
      if (musicByCategory.length > 0) {
        // Filter out the current music ID
        const availableMusic = musicByCategory.filter(music => music._id !== currentMusicId);
    
        // If there are available musics in the category (excluding the current one), select a random one
        if (availableMusic.length > 0) {
          const randomMusic = availableMusic[Math.floor(Math.random() * availableMusic.length)];
          console.log('Selected random music:', randomMusic);
    
          // Return the ID of the selected random music
          return randomMusic._id;
        }
      }
    
      // If no music found in the category, select a random music from all available music
      const availableMusic = AllMusic.filter(music => music._id !== currentMusicId);
      if (availableMusic.length > 0) {
        const randomMusic = availableMusic[Math.floor(Math.random() * availableMusic.length)];
        console.log('Selected random music:', randomMusic);
    
        // Return the ID of the selected random music
        return randomMusic._id;
      }
    
      // Handle the case where there are no other available musics
      console.log('No other available music.');
      return null;
    } catch (error) {
      console.error('Error selecting random music:', error.message);
      return null;
    }
  };


  const getPrevMusic = async () => {
    navigate(-1);
  };


  const location = useLocation();
  let currentTiming, navState;

if (location.state) {
  ({ currentTiming, navState } = location.state);
} else {
  console.error('location.state is null');
}
  const handleMinimize = () => {

    props.onMinimize({ ...musicDetails, currentRef: refaudio });
  };
  const onClose = () => {
    props.closePlayer();
  };
  // console.log('Audio ref state:', currentTiming);
  // console.log('navState:', navState);

  const currentRef = (audio) => {
    refaudio = audio;
    if(navState){
    if (currentTiming) {
      audio.currentTime = currentTiming;
      navState=false;
    } else {
      console.error('Invalid currentTiming:', currentTiming);
    }
  }
  };
  
  

  return (
    <div className='musicPlayerContainer'>


<FontAwesomeIcon icon={faArrowDown} id="minimizeButton" onClick={handleMinimize} />
    <div className={`player-component ${isSwitched ? 'switch' : ''}`}>

    <button id="toggleButton" onClick={handleToggle}>
      <FontAwesomeIcon icon={isSwitched ? faToggleOn : faToggleOff} />
    </button>
    {isLoading ? ( 
           <div className="loading-container">
           <div className="centered-loader">
             <RingLoader color={"#d10d68"} loading={isLoading} size={80} aria-label="Loading Spinner" />
           </div>
         </div>
    ) : (
      <>
        <PlayerContainer musicDetails={musicDetails} getNextMusic={getNextMusic} getPrevMusic={getPrevMusic} currentRef={currentRef} />
        {isSwitched && <LyricsContainer musicDetails={musicDetails} />}
      </>
    )}  
  </div>
  </div>
  );
};

export default MusicPlayer;
