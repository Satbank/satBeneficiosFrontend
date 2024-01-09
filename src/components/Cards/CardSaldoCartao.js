import React, { useEffect, useState } from 'react';
import { Box, CardContent, Icon, Paper, Typography } from '@mui/material';
import CreditCard from '@mui/icons-material/CreditCard';
import { Link as RouterLink } from 'react-router-dom';
import CountUp from 'react-countup';
import FrenteCartao from '../../image/frentecartao.jpg'
import { TotalMes } from '../../services';




function CardSaldoCartao() {
  const [totalcartoes, setTotalCartoes] = useState([])
  const [isMouseOver, setIsMouseOver] = useState(false);

  async function getTotalCartoes() {
    const res = await TotalMes.getTotalCartoes();
    if (res)   
    setTotalCartoes(res)
  }
  useEffect(() => {
    getTotalCartoes();
  }, [])

  return (
    <CardContent >
      <RouterLink to="/todosCartoes" style={{ textDecoration: 'none' }}>
       
      <Box
          id="card-container"
          component={Paper}
          sx={{
            width: '115.60mm',
            height: '69.98mm',
            backgroundImage: `url(${FrenteCartao})`,
            backgroundSize: 'cover',
            position: 'relative',  // Habilita o posicionamento absoluto
            transition: 'transform 0.3s ease',
            transform: isMouseOver ? 'translateX(10px)' : 'translateX(0)',
          }}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}>
         
          <Typography variant='h3'
            sx={{
              color: '1C1C1C',
              position: 'absolute',
              top: '150px',
              left: '18px',
              fontSize: '23px!important',              
            }}
          >Saldo</Typography>

          <Typography variant='h3'
            sx={{
              color: '#1C1C1C',
              position: 'absolute',
              top: '178px',
              left: '42px',
              fontSize: '40px!important',
              fontWeight: 'bold',
            }}
          >   <CountUp end={totalcartoes} prefix='R$ ' separator='.' decimal=',' decimals={2} /></Typography>
             <Typography variant='h3'
            sx={{
              color: '1C1C1C',
              position: 'absolute',
              top: '250px',
              left: '18px',
              fontSize: '11px!important',              
            }}
          >Ultima Atualização 25/12/2023 as 15:00</Typography>
        </Box>
      </RouterLink>
    </CardContent>
  )
}

export default CardSaldoCartao;