import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import CardBemVindo from '../../../components/Cards/CardBemVindo';
import { CardSaldoCartao, CardTrocarSenha, CardExtrato, CardFotoSatBank } from '../../../components';
import { ClientesService } from '../../../services';
import { MaskCartao,  MaskDateBackend } from '../../../utils/mascaras';

function DashboardCliente() {
  const [cartoes, setCartoes] = useState([]);

  useEffect(() => {
    async function fetchCartoes() {
      const res = await ClientesService.trazerSaldoCartao();
      if (res) setCartoes(res);
    }

    fetchCartoes();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={8}>
          <CardBemVindo />
        </Grid>
     
        {cartoes.map((cartao, index) => (
          <Grid item key={index} xs={12} md={6} lg={6}>
            <CardSaldoCartao cartao={{ ...cartao, cartao: MaskCartao(cartao.cartao), atualizacao: MaskDateBackend(cartao.atualizacao) }} />
          </Grid>
        ))}

        <Grid item xs={12} md={6} lg={3}>
          <CardTrocarSenha/>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <CardExtrato/>
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={2}>
          <CardFotoSatBank/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardCliente;
