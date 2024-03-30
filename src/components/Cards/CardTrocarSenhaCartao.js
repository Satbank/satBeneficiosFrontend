import React, { useState } from 'react';
import { Box, CardContent,  Icon,  Paper, Typography } from '@mui/material';
import CreditCard from '@mui/icons-material/CreditCard';
import { Link as RouterLink } from 'react-router-dom';

// import { Container } from './styles';

function CardTrocarSenha() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <CardContent >
      <RouterLink to="/trocarsenhacartao" style={{ textDecoration: 'none' }}>
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
            component={CreditCard}
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
          >Trocar senha  </Typography>        
          <Typography variant='h3'
            sx={{
              color: 'white',
              position: 'absolute',
              top: '55px',
              left: '12px',
              fontSize: '20px!important',

            }}
          >do</Typography>        
          <Typography variant='h3'
            sx={{
              color: 'white',
              position: 'absolute',
              top: '95px',
              left: '12px',
              fontSize: '20px!important',

            }}
          >cartao</Typography>        
        </Box>
      </RouterLink>
    </CardContent>
  )
}

export default CardTrocarSenha;