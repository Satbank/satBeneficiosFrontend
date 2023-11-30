import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate({ size = 40, customColor = '#1C2335' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <CircularProgress size={size} style={{ color: customColor }} />
    </Box>
      // para chamar o componente em qualquer lugar da aplicção mudando o size e o color esta o exemplo de como fazer :
      //   <div>
      //   <CircularIndeterminate size={60} color='secondary' />
      //   <CircularIndeterminate color='success' />
      // </div>
  );
}
