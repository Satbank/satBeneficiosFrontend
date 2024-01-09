import React, { useEffect, useState } from 'react';
import { Box, CardContent, Icon, Paper, Typography, useMediaQuery } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CountUp from 'react-countup';
import { Link as RouterLink } from 'react-router-dom';
import { TotalMes } from '../../services';

// import { Container } from './styles';

function CardTotalVendasComercios() {
  const [totalmes, setTotalMes] = useState([])
  const [isMouseOver, setIsMouseOver] = useState(false);

  async function getTotalVendasComercio() {
    const res = await TotalMes.getTotalVendasComercio();
    if (res)  
     setTotalMes(res)
  }
  useEffect(() => {
    getTotalVendasComercio();
  }, [])

  return (
    <CardContent >
      <RouterLink to="#" style={{ textDecoration: 'none' }}>
        <Box
          component={Paper}
          elevation={5}
          sx={{
            width: '100%', 
            maxWidth: '100%',
            height: '130px',
            background: '#003366',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            transform: isMouseOver ? 'translateX(10px)' : 'translateX(0)',
          }}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}>
          <Icon
            component={AttachMoneyIcon}
            sx={{
              height: '110%',
              opacity: '0,3',
              fontSize: '150px',
              color: 'rgba(255, 255, 255, 0.5)',
              position: 'absolute',
              right: '-50px',
              top: '-10px'
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
          >Valor Total em Aberto </Typography>

          <Typography variant='h3'
            sx={{
              color: '#2CFF5A',
              position: 'absolute',
              top: '60px',
              left: '32px',
              fontSize: '35px!important',

            }}
          ><CountUp end={totalmes} prefix='R$ ' separator='.' decimal=',' decimals={2} /> </Typography>
        </Box>
      </RouterLink>
    </CardContent>
  )
}

export default CardTotalVendasComercios;