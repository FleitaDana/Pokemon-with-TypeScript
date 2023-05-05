import {Grid, Typography, LinearProgress, Box } from '@mui/material';
import React from 'react'


const img = "../assets/loading.png"

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
                        Loading data<img width="200" src={img} alt='img' style={{ height: "200px", margin: "auto" }}></img><LinearProgress color="inherit" /> {/* VER ACA IMG */}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
export default Loading;