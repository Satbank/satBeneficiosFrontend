
import React from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const AcessoNegado = () => {
  return (

    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
      sx={{ background: 'linear-gradient(to bottom,   #000000, #1C2335 30%, #162F6E 70%, #003DDF ,#1C2335)', }}>
      <Box component={Paper} elevation={3} padding={3} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <Typography variant="h1" align="center" gutterBottom>
          Acesso Negado
        </Typography>
        <Typography variant="h4" align="center" paragraph>
          O seu perfil de usuario nao tem acesso a essa pagina
        </Typography>
        <Box sx={{ marginTop: 2, marginBottom: 2 }}>
          <Button component={Link} to="/" variant="contained"  >
            Página Inicial
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AcessoNegado;
