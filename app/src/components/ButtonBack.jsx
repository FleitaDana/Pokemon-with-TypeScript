import { Button, Grid, ThemeProvider } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';

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
				<ThemeProvider>
					<Button m="0" size="small" color="primary" variant="contained" onClick={goBack} sx={{ borderRadius: '10px', border: 2, fontStyle: 'oblique' }}><ReplyIcon p="0" sx={{ fontSize: 'large', width: '20px', height: '20px' }} /></Button>
				</ThemeProvider>
			</Grid>
		</Grid>
	</>;
}
export default ButtonBack;


