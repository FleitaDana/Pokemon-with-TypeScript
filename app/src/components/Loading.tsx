import {Grid, Typography, LinearProgress, Box } from '@mui/material';
import React from 'react'
import loadingImg from '../assets/loading';

const Loading = () => {
    return (
        <div className='background'>
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
                    <Typography variant="h4" color="primary" align='center'  sx={{fontStyle: 'oblique'}}>
                        Loading data<img width="200" src={loadingImg} alt='img' style={{ height: "300px", width: "300px", margin: "auto" }}></img><LinearProgress color="inherit" /> {/* VER ACA IMG */}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
        </div>
    );
}
export default Loading;