import { Box, Grid } from '@mui/material';
import React from 'react';
import {  CardBemVindo, CardFotoSatBank, CardTotalVendasComercios } from '../../../components';



// import { Container } from './styles';

function DashboardComercio() {
  return (
    <Box>
      <Grid container spacing={2} >

        <Grid item xs={12} md={12} lg={7}>
          <CardBemVindo />
        </Grid>


        <Grid item xs={12} md={5} lg={3}>
          <CardFotoSatBank />
        </Grid>

        <Grid item xs={12} md={8}  lg={3} >
          <CardTotalVendasComercios/>
        </Grid>

        <Grid item xs={12} md={8}>

        </Grid>

      </Grid>
    </Box>
  )
}

export default DashboardComercio;