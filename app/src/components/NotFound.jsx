import {Box, Grid, Typography } from '@mui/material';
import React from 'react'
import img from '../assets/notFound.png';

const NotFound = () => {

return(

<Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            p="20"
        >
            <Grid item
                justifyContent="center"
                alignItems="center"
                xs={12} md={12} lg={12}
                sx={{ margin: 2 }}>

                <Box display="flex" flexDirection="column"  justifyContent="center" alignItems="center"  height="600px">
                <img width="200" p="0" src={img} alt='img' sx={{ height: "200px", margin: "auto" }}></img>
                    <Typography variant="h4" color="white" align='center'>
                        Pokemon Not found
                    </Typography>
                </Box>
            </Grid>
        </Grid>
);
} 
export default NotFound;

