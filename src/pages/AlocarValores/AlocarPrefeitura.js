import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery } from '@mui/material';

import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { AlocarService, PrefeituraService } from '../../services';
import { MaskValor } from '../../utils/mascaras';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../store/actions/loading.action';
import { changeNotify } from '../../store/actions/notify.actions';
import { TableComponet } from '../../components';

const schema = yup.object({
  prefeituras_id: yup.string().required('O campo é obrigatório!'),
  tipo: yup.string().required('O campo é obrigatório!'),
});


function AlocarPrefeitura() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('md', 'lg'));
  const dispatch = useDispatch();
  const [prefeituraSelecionada, setPrefeituraSelecionada] = useState('');
  const [prefeituras, setPrefeituras] = useState([]);
  const [saldo, setSaldo] = useState([]);
  const [data, setData] = useState([]); 
  const [tipoSelecionado, setTipoSelecionado] = useState('entrada');
  const [loading, setLoading] = useState(false);

  const tipos = ['entrada', 'saida'];

 

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
    AlocarService.create(data)
      .then(() => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: 'Cartão cadastrado com sucesso !'
          })
        );
        reset();      
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

  const headers = [
    {
      id: "razao_social",
      label: "Nome",
      props: {
        align: 'left',       
      },

    },
    {
      id: "saldo",
      label: "Saldo",
      props: {
        align: 'left',
      },
    },

  ];

  return (
    <Box>
      <Box component={Paper} padding={2} marginBottom={5}>
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Alocar Valores para prefeitura </Typography>
      </Box>
      <Box component={Paper} padding={4} elevation={3}>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >

            <Grid item xs={12} md={4}>
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


            <Grid item xs={12} md={4}>
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

            <Grid item xs={12} md={4} marginTop='27px'>
              <TextField
                label='R$ Valor'
                id='valor_alocado'
                variant='outlined'
                fullWidth
                {...register("valor_alocado")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskValor(e.target.value);
                  setValue("valor_alocado", e.target.value, { shouldValidate: true });
                }}
              />
            </Grid>


            <Grid item xs={12} md={12}>
              <Box marginTop={2} textAlign="center">
                <Button type='submit' variant='contained' sx={{ width: '40%' }} >Enviar</Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Box>


      <Box marginTop={5}>
        <TableComponet
          headers={headers}
          data={saldo}
          labelCaption={'Nenhum prefeitura encontrado!!'}
          labelTable={'Saldo'}
          request
          loading={loading}
          setData={setSaldo}
          handlerRequest={async () => {
            setLoading(true)
            AlocarService.getSaldo().then(
              (data) => {
                setLoading(false)
                setSaldo(data || [])
                return data
              },
            )
            return []
          }}
        />
      </Box>

    </Box>

  )
}

export default AlocarPrefeitura;