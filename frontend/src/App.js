// src/App.js

import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import RecentlyAddedCarousel from './components/RecentlyAddedCarousel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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


// function App() extends React.Component{
//   header = 'Music Player';
//   settings = { effect: 'None' };
//   buttons = [{ 
//     click: () => { this.dialogInstance.hide(); }, 
//     buttonModel: { content: 'Close', isPrimary: true } 
//   }];

//   state = {
//     showDialog: false,
//     musicId: null
//   };

//   return (
//     <div className="main">
//       <Router>
//       <header>
//           <div className="options">
//             <button><i className="fas fa-bars"></i></button>
//           </div>
//           <div className="logo">
//             <img src={Logo} alt="Logo" />
//           </div>
//           <div className="search">
//             <button><i className="fas fa-search"></i></button>
//           </div>
//         </header>
        
        
//         <Routes>
//           <Route path="/musicplayer/:id" element={<MusicPlayer />} />
//           <Route
//             path="/category/:category"
//             element={<GetMusicByCategory />}
//           />
//           <Route
//             path="/poet/:poet"
//             element={<GetMusicByPoet />}
//           />
//           <Route path="/search/:term" element={<MusicSearch />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/recentlyadded" element={<RecentlyAddedCarousel />} />
//           {/* <Route path="/playlistplayer/:id" element={<PPlayer />} /> */}
//           <Route
//             path="/playlist/:id"
//             element={<GetMusicByPlaylist/>}
//           />
//           <Route path="/search" element={<MusicSearch />} />
//           <Route path="/categories" element={<Categories />} />
//           <Route path="/explore" element={<Explore />} />
//         </Routes>

//         <BottomNavigation/>
//       </Router>
//     </div>
//   );
// }

// export default App;

import { DialogComponent } from '@syncfusion/ej2-react-popups';
// ... other imports ...

class App extends React.Component {
  header = 'Music Player';
  settings = { effect: 'None' };
  buttons = [{ 
    click: () => { this.dialogInstance.hide(); }, 
    buttonModel: { content: 'Close', isPrimary: true } 
  }];

  state = {
    showDialog: false,
    musicId: null
  };

  onCreate() {
    // Code to execute when the DialogComponent is created
  }

   componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    if (id !== prevProps.match.params.id) {
      this.setState({ showDialog: !!id, musicId: id });
    }
  }

  render() {
    const { showDialog, musicId } = this.state;

    return (
        <div className="main">
      <header>
          <div className="options">
            <button><i className="fas fa-bars"></i></button>
          </div>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="search">
            <button><i className="fas fa-search"></i></button>
          </div>
        </header>
        
        <Router>
        <Routes>
          <Route path="/musicplayer/:id" element={<MusicPlayer />} />
          <Route
            path="/category/:category"
            element={<GetMusicByCategory />}
          />
          <Route
            path="/poet/:poet"
            element={<GetMusicByPoet />}
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

        <BottomNavigation/>

          {showDialog && (
            <DialogComponent 
              id='dialog' 
              created={this.onCreate.bind(this)} 
              header={this.header} 
              animationSettings={this.settings} 
              showCloseIcon={true} 
              closeOnEscape={true} 
              width='300px' 
              buttons={this.buttons} 
              ref={dialog => this.dialogInstance = dialog} 
              target='#dialog-target'
            >
              <MusicPlayer id={musicId} />
            </DialogComponent>
          )}
        </Router>
      </div>
    );
  }
}

export default App;