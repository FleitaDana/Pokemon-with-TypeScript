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
        <Route exact path='/' element={<Main />}></Route>
        <Route exact path='/Home' element={<Home />}></Route>
        <Route exact path='/SeeDetails/:id' element={<SeeDetails />}></Route>
        <Route exact path='*' element={<Error404 />}></Route>
      </Routes>
    </Router>
    // </div>
  );
}
export default App;