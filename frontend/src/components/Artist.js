import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Poets.css';

function Artist() {
  const [poetList, setpoetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch poet data by category
    const fetchArtist = async () => {
      try {
        console.log('CONNECT_URL:', process.env.REACT_APP_URL);

        // const response = await fetch(`http://localhost:8000/poet/category/${category}`);
        const response = await fetch(`${process.env.REACT_APP_URL}/artists`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setpoetList(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(`Error fetching  poet:`, error.message);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchArtist();
  }, []);
  return (
    <>
    <h3 className='cat-head'>Artists</h3>
    <div className='poet-container'>

      {poetList.map((poet) => (
      <NavLink to={`/poet/${poet.Name}`} className='category-link'>
      {/* <div className="poet-item">
        <img src={poet.Image} alt="Hamd" class="poet-img" />
        <h3 className="poet-name">
        {poet.Name}
      </h3>
      </div> */}
      <div className="p-card" key={poet._id}>
    <img 
        className="p-background-image" 
        src={poet.Image} 
        alt={`Background Image for ${poet.Name}`} 
        onError={(e)=>{e.target.onerror = null; e.target.src="https://w0.peakpx.com/wallpaper/275/222/HD-wallpaper-sudotack-microphone-audio-record-mic-music-music-artist-podcast-singing-voice-over.jpg"}}
    />
    <div className="p-gradient-layer"></div>
    <div className="p-content">
      <div className="p-text-content">
        <h5>{poet.Name}</h5>
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