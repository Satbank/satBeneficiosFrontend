import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import CardBemVindo from '../../../components/Cards/CardBemVindo';
import { CardFotoSatBank, CardSaldoCartao } from '../../../components';

// import { Container } from './styles';

function DashboardCliente() {
  return (
    <Box>
      <Grid container spacing={2} >

        <Grid item xs={12} md={12} lg={8}>
          <CardBemVindo />
        </Grid>
     

        <Grid item xs={12} md={6} lg={5}>
          <CardSaldoCartao/>
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={2}>
          <CardFotoSatBank/>
        </Grid>

      </Grid>
    </Box>
  )
}

export default DashboardCliente;