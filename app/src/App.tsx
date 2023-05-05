import './App.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import SeeDetails from './pages/SeeDetails';
import Main from './pages/Main';
import Error404 from './pages/Error404';

function App() {
  return (
    // <div className='App-header'>
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/SeeDetails/:name' element={<SeeDetails />}></Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
    </Router>
    // </div>
  );
}
export default App;