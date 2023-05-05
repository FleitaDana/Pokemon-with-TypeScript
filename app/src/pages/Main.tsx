import { Box, Button, Container, Link } from '@mui/material';
import React from 'react'
import theme from '../assets/Theme'

const Main = () => {

    return (
        <div className='background-main'>
            <Container maxWidth="md" sx={{ mt: 40 }}>
                <Box
                    alignItems="center"
                    display="flex"
                    sx={{
                        width: '100%', height: '500',
                        [theme.breakpoints.down('lg')]: {
                        justifyContent: 'center'
                        },
                    }}>

                    <Link underline='none' href='/home' >
                        <Button size="large" color="primary" variant="contained" sx={{ borderRadius: '10px', border: 2, fontStyle: 'oblique' }}><b>Meet Pokemon</b></Button>
                    </Link>

                </Box>
            </Container>
        </div>
    );
}
export default Main;