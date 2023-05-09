import { Button, Grid, ThemeProvider } from '@mui/material';
// import theme from '../assets/Theme';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Reply} from '@mui/icons-material';

function ButtonBack() {
	const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
		localStorage.clear();
	}

	return <>
		<Grid
			container
			direction="column"
			justifyContent="space-evenly"
			alignItems="center"

		>
			<Grid item
				justifyContent="center"
				alignItems="center"
				xs={12} md={12} lg={12}
				sx={{ margin: 2 }}>
				{/* <ThemeProvider theme={theme}> */}
					{/* <Button m="0" size="small" color="primary" variant="contained" onClick={goBack} sx={{ borderRadius: '10px', border: 2, fontStyle: 'oblique' }}></Button> */}
				<Button size="small" color='primary' variant="contained" onClick={goBack} sx={{ borderRadius: '10px', fontStyle: 'oblique', border: '2px' }} startIcon={<Reply sx={{ borderRadius: '10px', fontStyle: 'oblique'}}/>}></Button> {/*  VER ACA */}
				{/* </ThemeProvider> */}
			</Grid>
		</Grid>
	</>;
}
export default ButtonBack;


