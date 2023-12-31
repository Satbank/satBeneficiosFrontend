import React from 'react'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { CardAdminTotalMes, CardBemVindo, MobilieCardBemVindo, MobilieCardFotoSatBanck } from '../../../components'
import CardFotoSatBank from '../../../components/Cards/CardFotoSatBank'

function Dashboard() {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box>
      {isLgScreen ? (
        // Se for uma tela grande, renderize este layout
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={7}>
            <CardBemVindo />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <CardFotoSatBank />
          </Grid>
          <Grid item xs={12} md={2} marginTop={32} sx={{ position: 'absolute' }}>
            <CardAdminTotalMes />
          </Grid>
          <Grid item xs={12} md={8}></Grid>
        </Grid>
      ) : (
        // Se for uma tela pequena, renderize este layout
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MobilieCardBemVindo />
          </Grid>

          <Grid item xs={12} md={6}>
            <MobilieCardFotoSatBanck/>
          </Grid>

          <Grid item xs={12} md={6}>
            <CardAdminTotalMes/>
          </Grid>
        
        </Grid>
      )}
    </Box>
  );
}
export default Dashboard