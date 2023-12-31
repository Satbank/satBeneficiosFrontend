import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import {  CardBemVindo } from '../../../components';
import CardFotoSatBank from '../../../components/Cards/CardFotoSatBank';


// import { Container } from './styles';

function DashboardComercio() {
  return (
    <Box>
      <Grid container spacing={2} >

        <Grid item xs={12} md={12} lg={7}>
          <CardBemVindo />
        </Grid>


        <Grid item xs={12} md={5}>
          <CardFotoSatBank />
        </Grid>

        <Grid item xs={12} md={2} >
          
        </Grid>

        <Grid item xs={12} md={8}>

        </Grid>

      </Grid>
    </Box>
  )
}

export default DashboardComercio;