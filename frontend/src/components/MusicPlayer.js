import React, { useState, useEffect,CSSProperties  } from 'react';
import { useParams } from 'react-router-dom';
import PlayerContainer from './PlayerContainer';
import LyricsContainer from './LyricsContainer';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';
import { useNavigate } from 'react-router-dom';
import RingLoader from "react-spinners/RingLoader";
const MusicPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  

  const [isSwitched, setSwitch] = useState(false);
  const [musicDetails, setMusicDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  
  
  

  return (
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
        <PlayerContainer musicDetails={musicDetails} onMusicCompletion={onMusicCompletion} />
        {isSwitched && <LyricsContainer musicDetails={musicDetails} />}
      </>
    )}  
  </div>
  );
};

export default MusicPlayer;
