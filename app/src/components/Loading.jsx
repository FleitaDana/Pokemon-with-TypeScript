import {Grid, Typography, LinearProgress, Box } from '@mui/material';
import React from 'react'
import img from '../assets/loading.png';

const Loading = () => {
    return (
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
                    <Typography variant="h4" color="white" align='center'>
                        Loading data<img width="200" p="0" src={img} alt='img' sx={{ height: "200px", margin: "auto" }}></img><LinearProgress color="inherit" />
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
export default Loading;