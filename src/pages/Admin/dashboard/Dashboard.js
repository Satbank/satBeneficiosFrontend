import React from 'react'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { CardAdminTotalMes, CardBemVindo, CardTotalCartoes, CardTotalClientesbase, CardTotalComercios, SimpleLineChart, } from '../../../components'
import CardFotoSatBank from '../../../components/Cards/CardFotoSatBank'

function Dashboard() {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box>
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <CardBemVindo />
      </Grid>  

      <Grid item xs={12} md={5} lg={3}>
        <CardAdminTotalMes />
      </Grid>

      <Grid item xs={12} md={5} lg={3}>
        <CardTotalCartoes />
      </Grid>

      <Grid item xs={12} md={5} lg={3} >
        <CardTotalClientesbase />
      </Grid>

      <Grid item xs={12} md={5} lg={3} >
        <CardTotalComercios />
      </Grid>

      <Grid item xs={12} md={10} lg={7}>
         <SimpleLineChart/>
      </Grid>

      <Grid item xs={12} md={12}></Grid>
    </Grid>
  </Box>
  );
}
export default Dashboard