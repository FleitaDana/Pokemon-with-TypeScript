import {Grid, Typography, Box } from '@mui/material';
import React from 'react'
import errorImg from '../assets/error';

const Error = () => {
   
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            p="20"
            height={'100vh'}
        >
            <Grid item
                justifyContent="center"
                alignItems="center"
                xs={12} md={12} lg={12}
                sx={{ margin: 2 }}>

                <Box display="flex" flexDirection="column"  justifyContent="center" alignItems="center"  height="600px">
                    <Typography variant="h4" color="primary" align='center' sx={{fontStyle: 'oblique'}}>
                        ¿What are you looking for? <img width="200" src={errorImg} alt='img' style={{ height: "200px", margin: "auto" }}/>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Error;