import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import CardBemVindo from '../../../components/Cards/CardBemVindo';

// import { Container } from './styles';

function DashboardCliente() {
  return (
    <Box>
      <Grid container spacing={2} >

        <Grid item xs={12} md={12} lg={8}>
          <CardBemVindo />
        </Grid>


        <Grid item xs={12} md={6} lg={4}>
          <Typography>aqui</Typography>
        </Grid>

        <Grid item xs={12} md={4}>

        </Grid>

        <Grid item xs={12} md={8}>

        </Grid>

      </Grid>
    </Box>
  )
}

export default DashboardCliente;