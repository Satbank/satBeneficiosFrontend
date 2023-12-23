import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


import { MaskValor } from '../../../utils/mascaras';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';
import { AlocarPrefeituraClienteService, PrefeituraService } from '../../../services';
import AlocarValoresIndividual from './AlocarValoresIndividual';


const schema = yup.object({
  tipo_cartao: yup.string().required('O campo é obrigatório!'),
  tipo: yup.string().required('O campo é obrigatório!'),
  prefeituras_id: yup.string().required('O campo é obrigatório!'),
  valor_movimentado_individual: yup.string().required('O campo é obrigatório!'),
});


function AlocarClientes() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const [tipoSelecionado, setTipoSelecionado] = useState('entrada');
  const [tipo_cartaoSelecionado, setTipo_cartaoSelecionado] = useState('cesta_basica');
  const [prefeituraSelecionada, setPrefeituraSelecionada] = useState('');
  const [prefeituras, setPrefeituras] = useState([]);


  const tipos = ['entrada', 'saida'];
  const tipo_cartao = ['cesta_basica', 'esporte']

  const getPrefeitura = async () => {
    const res = await PrefeituraService.getPrefeitura();
    if (res && res.length > 0) {
      setPrefeituraSelecionada(res[0]);
      setPrefeituras(res);
    }
  };
  useEffect(() => {
    getPrefeitura();
  }, [])

  function handleSubmit(data) {
    dispatch(
      changeloading({
        open: true,
        msg: "carregando..."
      })
    );
    AlocarPrefeituraClienteService.create(data)
      .then(() => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: 'Cartão cadastrado com sucesso !'
          })
        );
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        console.log(error)
        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: error.response.data.error
          })
        );
      });
  };



  return (
    <Box>
      <Box component={Paper} padding={2} marginBottom={5}>
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Alocar Valores para Cartões de clientes em massa</Typography>
      </Box>

      <Box component={Paper} padding={4} elevation={3}>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >

            <Grid item xs={12} md={3}>
              <InputLabel id="tipo_cartao">Selecione o tipo do cartão </InputLabel>
              <Select
                label='Tipo cartão'
                id='tipo_cartao'
                variant='outlined'
                fullWidth
                {...register('tipo_cartao')}
                size='small'
                value={tipo_cartaoSelecionado}
                onChange={(e) => setTipo_cartaoSelecionado(e.target.value)}
              >
                {tipo_cartao.map((tipoCartaoOpcao) => (
                  <MenuItem key={tipoCartaoOpcao} value={tipoCartaoOpcao}>
                    {tipoCartaoOpcao}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant='subtitle2'>{errors?.tipo_cartao?.message}</Typography>
            </Grid>


            <Grid item xs={12} md={3}>
              <InputLabel id="tipo">Selecione o tipo de movimentação </InputLabel>
              <Select
                label='Tipo'
                id='tipo'
                variant='outlined'
                fullWidth
                {...register('tipo')}
                size='small'
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              >
                {tipos.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant='subtitle2'>{errors?.tipo?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={3} marginTop='27px'>
              <TextField
                label='R$ Valor'
                id='valor_movimentado_individual'
                variant='outlined'
                fullWidth
                {...register("valor_movimentado_individual")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskValor(e.target.value);
                  setValue("valor_movimentado_individual", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.valor_movimentado_individual?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={3}>
              <InputLabel id="prefeituras_id">Selecione a prefeitura</InputLabel>
              <Select
                label='prefeitura'
                id='prefeituras_id'
                variant='outlined'
                fullWidth
                {...register('prefeituras_id')}
                size='small'
                value={prefeituraSelecionada ? prefeituraSelecionada.id : ''}
                onChange={(e) => {
                  const selectedPrefeitura = prefeituras.find(prefeitura => prefeitura.id === e.target.value);
                  setPrefeituraSelecionada(selectedPrefeitura);
                }}
              >
                {prefeituras.map(prefeitura => (
                  <MenuItem key={prefeitura.id} value={prefeitura.id}>
                    {prefeitura.razao_social}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant='subtitle2'>{errors?.prefeituras_id?.message}</Typography>
            </Grid>


            <Grid item xs={12} md={12}>
              <Box marginTop={2} textAlign="center">
                <Button type='submit' variant='contained' sx={{ width: '40%' }} >Enviar</Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Box>
      <Box marginTop={20}>
        <AlocarValoresIndividual prefeituras={prefeituras} />
      </Box>

    </Box>

  )
}

export default AlocarClientes;