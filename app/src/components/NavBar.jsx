// este componente no se usa 

import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavBar = () => { 
  return (
    <div>  
      <AppBar>
        <Toolbar>
        <Link className='link' to='/pokemones'><Button color="inherit">Pokemones</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar;
