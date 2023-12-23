import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { MaskValor } from '../../../utils/mascaras';

const schema = yup.object({
  numero_cartao: yup.string().required('O campo é obrigatório!'),
  valor: yup.string().required('O campo é obrigatório!'),
  
});

function Vendas() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('md', 'lg'));


  let paperWidth = '40%'; // Padrão para telas grandes  
  if (isSmallScreen) {
    paperWidth = '100%'; // Para telas pequenas
  } else if (isMediumScreen) {
    paperWidth = '75%'; // Para telas médias
  }


  function handleSubmit(data) {
    console.log(data)
    // dispatch(
    //   changeloading({
    //     open: true,
    //     msg: "carregando..."
    //   })
    // );
    // AlocarPrefeituraClienteService.create(data)
    //   .then(() => {
    //     dispatch(changeloading({ open: false }));
    //     dispatch(
    //       changeNotify({
    //         open: true,
    //         class: "success",
    //         msg: 'Cartão cadastrado com sucesso !'
    //       })
    //     );
    //   })
    //   .catch((error) => {
    //     dispatch(changeloading({ open: false }));
    //     console.log(error)
    //     dispatch(
    //       changeNotify({
    //         open: true,
    //         class: "error",
    //         msg: error.response.data.error
    //       })
    //     );
    //   });
  };
  return (
    <Box>
      <Box component={Paper} padding={2} marginBottom={5}>
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Nova Venda</Typography>
      </Box>

      <Box component={Paper}width={paperWidth} padding={4} elevation={3}sx={{ flexGrow: 1, margin: 'auto', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >
            <Grid item xs={12} md={12}>            
              <TextField
                label='Numero do Cartão'
                id='numero_cartao'
                variant='outlined'
                fullWidth
                autoComplete='off'
                {...register('numero_cartao')}
                size='small'            
              />   
               <Typography variant='subtitle2'>{errors?.numero_cartao?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={12} >
              <TextField
                label='R$ Valor'
                id='valor_movimentado_individual'
                variant='outlined'
                fullWidth
                autoComplete='off'
                {...register("valor")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskValor(e.target.value);
                  setValue("valor_movimentado_individual", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.valor?.message}</Typography>
            </Grid>




            <Grid item xs={12} md={12}>
              <Box marginTop={2} textAlign="center">
                <Button type='submit' variant='contained' sx={{ width: '40%' }} >Enviar</Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Box>   

    </Box>

  )
}

export default Vendas;