import React from 'react'
import { Box, Grid, useMediaQuery } from '@mui/material'
import { CardAdminTotalMes, CardBemVindo } from '../../../components'
import CardFotoSatBank from '../../../components/Cards/CardFotoSatBank'

function Dashboard() {  
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  return (
    <Box>
      <Grid container spacing={2} >

        <Grid item xs={12} md={12} lg={7}>
          <CardBemVindo />
        </Grid>


        <Grid item xs={12} md={6} lg={5}>
          <CardFotoSatBank />
        </Grid>     

        <Grid item xs={12} md={2}  marginTop={32}  sx={{
            position: isLgScreen ? 'absolute' : 'static',
            marginTop: isLgScreen ? 32 : 0,
          }}>
          <CardAdminTotalMes />
        </Grid>

        <Grid item xs={12} md={8}>

        </Grid>

      </Grid>
    </Box>
  )
}
export default Dashboard