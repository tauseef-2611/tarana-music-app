import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Poets.css';

function Poets() {
  const [poetList, setpoetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch poet data by category
    const fetchPoets = async () => {
      try {
        console.log('CONNECT_URL:', process.env.REACT_APP_URL);

        // const response = await fetch(`http://localhost:8000/poet/category/${category}`);
        const response = await fetch(`${process.env.REACT_APP_URL}/poets`);
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

    fetchPoets();
  }, []);
  return (
    <>
    <h3 className='cat-head'>Poets</h3>
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
        onError={(e)=>{e.target.onerror = null; e.target.src="https://themillions.com/wp-content/uploads/2016/09/Stipula_fountain_pen.jpg"}}
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

export default Poets;