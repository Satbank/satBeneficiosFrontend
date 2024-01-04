import React, { useEffect, useState } from 'react';
import { Box, CardContent, Icon, Paper, Typography, useMediaQuery } from '@mui/material';
import Person from '@mui/icons-material/Person';
import { Link as RouterLink } from 'react-router-dom';
import CountUp from 'react-countup';
import { TotalMes } from '../../services';




function CardTotalClientesbase() {
  const [totalClienteBase, setTotalClienteBase] = useState([])
  const [isMouseOver, setIsMouseOver] = useState(false);

  async function getTotalClientesBase() {
    const res = await TotalMes.getTotalClientesBase();
    if (res)   
    setTotalClienteBase(res)
  }
  useEffect(() => {
    getTotalClientesBase();
  }, [])

  return (
    <CardContent >
      <RouterLink to="/todosClientes" style={{ textDecoration: 'none' }}>
        <Box
          component={Paper}
          elevation={5}
          sx={{
            width: '100%', // ou ajuste conforme necessário
            maxWidth: '100%', // adiciona uma largura máxima
            height: '130px',
            background: '#003366',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            transform: isMouseOver ? 'translateX(10px)' : 'translateX(0)',
          }}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}>
          <Icon
            component={Person}
            sx={{
              height: '90%',
              opacity: '0,3',
              fontSize: '100px',
              color: 'rgba(255, 255, 255, 0.5)',
              position: 'absolute',
              right: '-5px',
              top: '25px'
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
          >Total clientes na base </Typography>

          <Typography variant='h3'
            sx={{
              color: '#FFD700',
              position: 'absolute',
              top: '60px',
              left: '72px',
              fontSize: '35px!important',

            }}
          > <CountUp end={totalClienteBase} /></Typography>
        </Box>
      </RouterLink>
    </CardContent>
  )
}

export default CardTotalClientesbase;