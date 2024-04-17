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

        const data = await response.json();

        console.log('Server response:', response);
        console.log('Fetched music details:', data);

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


  const onMusicCompletion = async () => {
    setIsLoading(true);
    // Get the current music's category
    const currentMusicCategory = musicDetails?.Category;
    console.log('Current music category:', currentMusicCategory);
    // If there is a category, fetch a random music ID from another category
    if (currentMusicCategory) {
      try {
        const randomMusicId = await getRandomMusicId(currentMusicCategory,musicDetails._id);
        console.log('Random music ID:', randomMusicId);
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
  
  const getRandomMusicId = async (currentCategoryId, currentMusicId) => {
    try {
      // Fetch music by category from the server
      const response = await fetch(`${process.env.REACT_APP_URL}/music/category/${currentCategoryId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetched music by category:', data);
      
      // Check if the response is an array
      if (Array.isArray(data)&&data.length>1) {
        // Filter out the current music ID
        const availableMusic = data.filter((music) => music._id !== currentMusicId);
  
        // If there are available musics in the category (excluding the current one), select a random one
        if (availableMusic.length > 0) {
          const randomMusic = availableMusic[Math.floor(Math.random() * availableMusic.length)];
          console.log('Selected random music:', randomMusic);
  
          // Return the ID of the selected random music
          return randomMusic._id;
        }
      }
        else {
          const allMusic = await fetch(`${process.env.REACT_APP_URL}/music`);
          const data = await allMusic.json();
          if (Array.isArray(data)) {
        // Filter out the current music ID
        const availableMusic = data.filter((music) => music._id !== currentMusicId);
  
        // If there are available musics in the category (excluding the current one), select a random one
        if (availableMusic.length > 0) {
          const randomMusic = availableMusic[Math.floor(Math.random() * availableMusic.length)];
          console.log('Selected random music:', randomMusic);
  
          // Return the ID of the selected random music
          return randomMusic._id;
          // Handle the case where there are no other available musics in the category
        }
      } else {
        // Handle the case where the response is not an array
        console.log('Invalid response format. Expected an array.');
        return null;
      }
    }
    } catch (error) {
      console.error('Error fetching music by category:', error.message);
      return null;
    }
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
  console.log('Audio ref state:', currentTiming);
  console.log('navState:', navState);

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
        <PlayerContainer musicDetails={musicDetails} onMusicCompletion={onMusicCompletion} currentRef={currentRef} />
        {isSwitched && <LyricsContainer musicDetails={musicDetails} />}
      </>
    )}  
  </div>
  </div>
  );
};

export default MusicPlayer;
