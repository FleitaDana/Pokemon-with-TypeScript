import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import SeeDetails from './pages/SeeDetails';
import Main from './pages/Main';
import Error404 from './pages/Error404';
import { useEffect, useState } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box } from '@mui/material';


function App() {

  // useEffect(() => {
  //   const audio = new Audio('https://s17.aconvert.com/convert/p3r68-cdx67/4cb12-ksfal.mp3');
  //   audio.volume = 0.5; // Establece el volumen a la mitad
  //   audio.loop = true; // Reproduce la música en bucle
  //   audio.play(); // Empieza la reproducción
  //   return () => {
  //     audio.pause(); // Pausa la reproducción al desmontar el componente
  //   };
  // }, []);

  // const [isPlaying, setIsPlaying] = useState(false);

  // const toggleMusic = () => {
  //   const audio = new Audio('https://s17.aconvert.com/convert/p3r68-cdx67/4cb12-ksfal.mp3');

  //   if (isPlaying) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  //   useEffect(() => {


  //     setIsPlaying(true);

  // }, []);


  const [isPlaying, setIsPlaying] = useState(true);
  // const [audio] = useState(new Audio('https://s17.aconvert.com/convert/p3r68-cdx67/4cb12-ksfal.mp3'));
  const [audio] = useState(new Audio('./assets/audio/cancionApp.mp3'));


  useEffect(() => {
    audio.volume = 0.5;
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    // <div className='App-header'>
    <div className="App">
      {/* <button onClick={toggleMusic}>{isPlaying ? 'Stop' : 'Play'} Music</button>
      <audio id="pokemon-music" loop>
        <source  type="audio/mpeg" />
      </audio> */}

      {/* <button onClick={toggleMusic}>{isPlaying ? 'Stop' : 'Play'} Music</button> */}

      {/* Other components */}


      <Box display="flex" justifyContent="right" alignItems="right" position="static">
        <button onClick={toggleMusic}>{isPlaying ? 'Stop' : 'Play'}<VolumeUpIcon sx={{ fontSize: 'large', width: '20px', height: '20px', borderRadius: '50%' }} /></button>
      </Box>

      <Router>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/SeeDetails/:name' element={<SeeDetails />}></Route>
          <Route path='*' element={<Error404 />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;