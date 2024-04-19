import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './List.css';
// import './card.css';
const ListItem = ({ music }) => (
    <div className="list-item" key={music._id}>
                <img className="cover-image" src={music.Cover} alt="Cover Image 1"onError={(e) => {e.target.onerror = null; e.target.src="https://wallpapercave.com/wp/wp6124200.jpg"}}/>
                <div className="text-content">
                    <h5 className="list-title">
                        <Marquee speed={10} gradient={false} gradientWidth={20} gradientColor="rgba(255, 255, 255, 0.083)" pauseOnHover delay={5}>
                        {music.Title+"  `"}
                        </Marquee>
                    </h5>
                    <p className="list-description">
                        {music.Artist}
                    </p>
                </div>
                <div className="buttons-container">
                    <NavLink to={`/musicplayer/${music._id}`}>
                        <button className="list-btns">
                        <FontAwesomeIcon icon={faPlay} id="play-button" />
                        </button>
                    </NavLink>
                </div>
          </div>
);

export default ListItem;
