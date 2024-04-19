// src/App.js
import React, { useState, useEffect } from 'react';
import MusicPlayer from './components/MusicPlayer';
import RecentlyAddedCarousel from './components/RecentlyAddedCarousel';
import { BrowserRouter as Router, Route, Routes, useNavigate,useLocation } from 'react-router-dom';
import './components/style.css';
import Logo from './logo-top.png';
import Home from './components/Home';
import GetMusicByCategory from './components/GetMusicByCategory';
import BottomNavigation from './components/BottomNavigation';
import MusicSearch from './components/MusicSearch';
import Categories from './components/Categories';
import Explore from './components/Explore';
import { useParams } from 'react-router-dom';
import GetMusicByPlaylist from './components/GetMusicByPlaylist';
import GetMusicByPoet from './components/GetMusicByPoet';
import GetMusicByArtist from './components/GetMusicByArtist';
import MiniPlayer from './components/MiniPlayer';


function NavigationHandler({ onMinimize, onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isMinimized) {
      onClose();
    }
  }, [onClose, isMinimized]);

  const location = useLocation();

return <MusicPlayer onMinimize={(details,currentRef) => {
  setIsMinimized(true);
  onMinimize(details);

  const previousPage = location.pathname;
  if (previousPage.includes('musicplayer/')) {
    navigate('/');
  } else {
    navigate(-1);
  }
}} />;
}

function App() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [musicDetails, setMusicDetails] = useState(null);
  let refaudio = React.createRef();
  const handleMinimize = (details) => {
    setIsMinimized(true);
    console.log('Details:', details);
    setMusicDetails(details);

  };
  const closePlayer = () => {
    setIsMinimized(false);
    setMusicDetails(null);
  };
  return (
    <div className="main">
      <Router>
      <header>
          {/* <div className="options">
            <button><i className="fas fa-bars"></i></button>
          </div> */}
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          {/* <div className="search">
            <button><i className="fas fa-search"></i></button>
          </div> */}
        </header>
        
        
        <Routes>
        <Route path="/musicplayer/:id" element={<NavigationHandler onMinimize={handleMinimize} onClose={closePlayer} />} />

          <Route
            path="/category/:category"
            element={<GetMusicByCategory />}
          />
          <Route
            path="/poet/:poet"
            element={<GetMusicByPoet />}
          />
          <Route
            path="/artist/:artist"
            element={<GetMusicByArtist />}
          />
          <Route path="/search/:term" element={<MusicSearch />} />
          <Route path="/" element={<Home />} />
          <Route path="/recentlyadded" element={<RecentlyAddedCarousel />} />
          {/* <Route path="/playlistplayer/:id" element={<PPlayer />} /> */}
          <Route
            path="/playlist/:id"
            element={<GetMusicByPlaylist/>}
          />
          <Route path="/search" element={<MusicSearch />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
        <div className='space'
        style={{height:'50px'}}
        ></div>
        <BottomNavigation/>
      {isMinimized && musicDetails && <MiniPlayer musicDetails={musicDetails} currentRef={refaudio} closePlayer={closePlayer} />}
      </Router>
    </div>
  );
}

export default App;
