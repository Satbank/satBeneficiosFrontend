import React, { useEffect, useState } from 'react';
import { Box, CardContent, Icon, Paper, Typography, useMediaQuery } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link as RouterLink } from 'react-router-dom';
import { TotalMes } from '../../services';
import { MaskValor } from '../../utils/mascaras';

// import { Container } from './styles';

function CardAdminTotalMes() {
  const [totalmes, setTotalMes] = useState([])

  async function getTotalMes() {
    const res = await TotalMes.getTotalMes();
    if (res)
      setTotalMes(res.total_taxas)
  }
  useEffect(() => {
    getTotalMes();
  }, [])

  return (
    <CardContent >
      <RouterLink to="#" style={{ textDecoration: 'none' }}>
        <Box component={Paper} elevation={5} position='relative' sx={{ width: '280px', height: '130px', background: ' #003366' }}>
          <Icon
            component={AttachMoneyIcon}
            sx={{
              fontSize: '150px',
              color: 'rgba(255, 255, 255, 0.5)',
              position: 'absolute',
              left: '180px',
            }}
          />
          <Typography variant='h3'
            sx={{
              color: 'white',
              position: 'absolute',
              top: '20px',
              left: '12px',
              fontSize: '20px!important',

            }}
          >Total Arrecadado Mês </Typography>
          <Typography variant='h3'
            sx={{
              color: 'white',
              position: 'absolute',
              top: '60px',
              left: '12px',
              fontSize: '20px!important',

            }}
          >R$: </Typography>
          <Typography variant='h3'
            sx={{
              color: '#2CFF5A',
              position: 'absolute',
              top: '60px',
              left: '72px',
              fontSize: '35px!important',

            }}
          > {MaskValor(totalmes)}</Typography>
        </Box>
      </RouterLink>
    </CardContent>
  )
}

export default CardAdminTotalMes;