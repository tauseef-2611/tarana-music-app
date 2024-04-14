import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Poets.css';

function Artist() {
  const [artistList, setartistList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch artist data by category
    const fetchArtist = async () => {
      try {
        console.log('CONNECT_URL:', process.env.REACT_APP_URL);

        // const response = await fetch(`http://localhost:8000/artist/category/${category}`);
        const response = await fetch(`${process.env.REACT_APP_URL}/artists`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setartistList(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(`Error fetching  artist:`, error.message);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchArtist();
  }, []);
  return (
    <>
    <h3 className='cat-head'>Artists</h3>
    <div className='poet-container'>

      {artistList.map((artist) => (
      <NavLink to={`/artist/${artist.Name}`} className='category-link'>
      {/* <div className="artist-item">
        <img src={artist.Image} alt="Hamd" class="artist-img" />
        <h3 className="artist-name">
        {artist.Name}
      </h3>
      </div> */}
      <div className="p-card" key={artist._id}>
    <img 
        className="p-background-image" 
        src={artist.Image} 
        alt={`Background Image for ${artist.Name}`} 
        onError={(e)=>{e.target.onerror = null; e.target.src="https://w0.peakpx.com/wallpaper/275/222/HD-wallpaper-sudotack-microphone-audio-record-mic-music-music-artist-podcast-singing-voice-over.jpg"}}
    />
    <div className="p-gradient-layer"></div>
    <div className="p-content">
      <div className="p-text-content">
        <h5>{artist.Name}</h5>
        {/* <p>{music.Artist}</p> */}
      </div>
    </div>
</div>
      </NavLink>))}
    
    </div>
    </>
  )
}

export default Artist;