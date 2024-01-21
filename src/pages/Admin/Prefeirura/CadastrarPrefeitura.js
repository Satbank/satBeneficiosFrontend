import { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


import {  MaskCnpj, MaskNome,  MaskPhone } from '../../../utils/mascaras';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';
import { PrefeituraService } from '../../../services';

const schema = yup.object({
  razao_social: yup.string().required('O campo é obrigatório!').min(3,'no minimo 3 caracteres'),
  email: yup.string().email(), 
  cnpj: yup.string().required(), 
  telefone: yup.string(),
  cidade: yup.string().min(3),
  uf: yup.string().max(2,'maximo 2 caracteres ex: GO'),  
});




function CadastrarPrefeitura() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch(); 

 

  function handleSubmit(data) {    
    dispatch(
      changeloading({
        open: true,
        msg: "carregando..."
      })   
    );
    PrefeituraService.create(data)
      .then((res) => {   
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: 'Prefeitura cadastrado com sucesso !'
          })
        );
        reset(); 
      })
      .catch((error) => {      
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: error.response.data.message
          })
        );
      });
  };

  return (
    <Box>
      <Box component={Paper} elevation={5} padding={2}>
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Cadastrar Novo Cliente </Typography>
      </Box>
      <Box component={Paper} elevation={5} sx={{ flexGrow: 1,  }} marginTop={2} padding={3} display="flex" flexDirection="column" alignItems="center">
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} alignItems="center" justify="center">

            <Grid item xs={12} md={5}>
            <TextField
                label='Razão Social'
                id='razao_social'
                variant='outlined'
                fullWidth
                {...register("razao_social")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskNome(e.target.value);
                  setValue("razao_social", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.razao_social?.message}</Typography>
            </Grid>          

            <Grid item xs={6} md={4}>
            <TextField
                label='Cnpj'
                id='cnpj'
                variant='outlined'
                fullWidth
                {...register("cnpj")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskCnpj(e.target.value);
                  setValue("cnpj", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.cnpj?.message}</Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                label='Telefone'
                id='telefone'
                variant='outlined'
                fullWidth
                {...register("telefone")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskPhone(e.target.value);
                  setValue("telefone", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.telefone?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label='Email'
                id='email'
                type='email'
                variant='outlined'
                fullWidth
                {...register('email')}
                size='small'
              />
               <Typography variant='subtitle2'>{errors?.email?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label='Senha'
                id='senha'
                type='password'
                variant='outlined'
                fullWidth
                {...register('senha')}
                size='small'
              />
            </Grid>          

            <Grid item xs={12} md={12}>
              <Typography marginLeft={2} variant='h6'>Endereço</Typography>
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField
                label="Rua"
                variant='outlined'
                fullWidth
                {...register("rua")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.rua?.message}</Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                label="numero"
                variant='outlined'
                fullWidth
                {...register("numero")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.nuemro?.message}</Typography>
            </Grid>

            <Grid item xs={6} md={4}>
              <TextField
                label="Bairro"
                variant='outlined'
                fullWidth
                {...register("bairro")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.bairro?.message}</Typography>

            </Grid>

            <Grid item xs={12} md={7}>
              <TextField
                label="Complemento"
                variant='outlined'
                fullWidth
                {...register("complemento")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.complemento?.message}</Typography>

            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                label="Cidade"
                variant='outlined'
                fullWidth
                {...register("cidade")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.cidade?.message}</Typography>

            </Grid>

            <Grid item xs={6} md={2}>
              <TextField
                label="UF"
                variant='outlined'
                fullWidth
                {...register("uf")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.uf?.message}</Typography>

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
  );
}

export default CadastrarPrefeitura
;
