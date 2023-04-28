import React from 'react'
import { Grid } from '@mui/material';
import Error from '../components/Error';


const Error404 = () => {

    return (
        <div className='background-table'>
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
                    <Error
                    />
                </Grid>
            </Grid>
        </div>
    );
}
export default Error404;