import React, { useEffect, useState } from 'react';
import { Box, CardContent, Icon, Paper, Typography, useMediaQuery } from '@mui/material';
import Store from '@mui/icons-material/Store';
import { Link as RouterLink } from 'react-router-dom';
import CountUp from 'react-countup';
import { TotalMes } from '../../services';




function CardTotalComercios() {
  const [totalComerciosBase, setTotalComerciosBase] = useState([])
  const [isMouseOver, setIsMouseOver] = useState(false);

  async function getTotalComerciosBase() {
    const res = await TotalMes.getTotalComerciosBase();
    if (res)   
    setTotalComerciosBase(res)
  }
  useEffect(() => {
    getTotalComerciosBase();
  }, [])

  return (
    <CardContent >
      <RouterLink to="/todasEmpresas" style={{ textDecoration: 'none' }}>
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
            component={Store}
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
          >Total Comercios na base </Typography>

          <Typography variant='h3'
            sx={{
              color: '#9A4E9A ',
              position: 'absolute',
              top: '60px',
              left: '72px',
              fontSize: '35px!important',

            }}
          ><CountUp end={totalComerciosBase}/></Typography>
        </Box>
      </RouterLink>
    </CardContent>
  )
}

export default CardTotalComercios;