import React, {  useState } from 'react';
import { Box, CardContent, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CountUp from 'react-countup';
import FrenteCartao from '../../image/frentecartao.jpg';


function CardSaldoCartao({ cartao }) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <CardContent>
      {/* <RouterLink to="#" style={{ textDecoration: 'none' }}> */}
        <Box
          id="card-container"
          component={Paper}
          sx={{
            width: '115.60mm',
            height: '69.98mm',
            backgroundImage: `url(${FrenteCartao})`,
            backgroundSize: 'cover',
            position: 'relative',
            transition: 'transform 0.3s ease',
            transform: isMouseOver ? 'translateX(10px)' : 'translateX(0)',
          }}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <Typography variant="h3" sx={{ color: '#1C1C1C', position: 'absolute', top: '139px', left: '18px', fontSize: '20px!important' }}>
            Cartão: {cartao.cartao}
          </Typography>

          <Typography variant="h3" sx={{ color: '1C1C1C', position: 'absolute', top: '171px', left: '18px', fontSize: '23px!important' }}>
            Saldo
          </Typography>

          <Typography variant="h3" sx={{ color: '#1C1C1C', position: 'absolute', top: '198px', left: '42px', fontSize: '40px!important', fontWeight: 'bold' }}>
            <CountUp end={cartao.saldo} prefix="R$ " separator="." decimal="," decimals={2} />
          </Typography>

          <Typography variant="h3" sx={{ color: '1C1C1C', position: 'absolute', top: '250px', left: '18px', fontSize: '11px!important' }}>
            Última Atualização {cartao.atualizacao}
          </Typography>
        </Box>
      {/* </RouterLink> */}
    </CardContent>
  );
}

export default CardSaldoCartao;