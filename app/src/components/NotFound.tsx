import {Box, Grid, Typography } from '@mui/material';
import React from 'react'
import notFoundImg from '../assets/notFound';

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

                <Box display="flex" flexDirection="column"  justifyContent="center" alignItems="center"  height="600px"  sx={{fontStyle: 'oblique'}}>
                <img width="200" src={notFoundImg} alt='img' style={{ height: "200px", margin: "30px" }}></img>
                    <Typography variant="h4" color="primary" align='center'>
                        Pokemon Not found
                    </Typography>
                </Box>
            </Grid>
        </Grid>
);
} 
export default NotFound;

