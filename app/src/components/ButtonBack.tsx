import { Button, Grid} from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
				<Button size="small" color='primary' variant="contained" onClick={goBack} sx={{ borderRadius: '5px', fontStyle: 'oblique', border: '2px' }} startIcon={<ArrowBackIcon sx={{ borderRadius: '10px', fontStyle: 'oblique'}}/>}></Button> 
			</Grid>
		</Grid>
	</>;
}
export default ButtonBack;


