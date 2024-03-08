// src/components/BottomNavigation.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './bottomNavigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faSearch }  from '@fortawesome/free-solid-svg-icons';
const BottomNavigation = () => {
  return (
    <nav className="bottom-navigation">
      <NavLink to="/" className="nav-link" activeclassname="active" end>
        <FontAwesomeIcon icon={faHome} />
        
      </NavLink>
      <NavLink to="/explore" className="nav-link" activeclassname="active">
<FontAwesomeIcon icon={faCompass} />
      </NavLink>
      <NavLink to="/search" className="nav-link" activeclassname="active">
<FontAwesomeIcon icon={faSearch} />
      </NavLink>
    </nav>
  );
}

export default BottomNavigation;
