import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


import { MaskValor } from '../../utils/mascaras';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../store/actions/loading.action';
import { changeNotify } from '../../store/actions/notify.actions';
import { AlocarService, CartaoService } from '../../services';
import { useDebounce } from '../../hooks/UseDebounce';


const schema = yup.object({
  
  tipo: yup.string().required('O campo é obrigatório!'),
  prefeituras_id: yup.string().required('O campo é obrigatório!'),
  numero_cartao: yup.string().required('O campo é obrigatório!'),
  saldo: yup.string().required('O campo é obrigatório!'),
});


function AlocarValoresIndividual({ prefeituras }) {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const [tipoSelecionado, setTipoSelecionado] = useState('entrada');
  const [prefeituraSelecionada, setPrefeituraSelecionada] = useState('');
  const [optionsCartoes, setOptionsCartoes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { debounce } = useDebounce();
  const tipos = ['entrada', 'saida'];


  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      CartaoService.getCartoes(selectedOption?.label || '')
        .then((res) => {
          setIsLoading(false);
          setOptionsCartoes(res.data.map(data => ({ id: data.id, label: data.numero_cartao })))
        })
    }, 500);
  }, [selectedOption]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedOption) return null;
    const selectedOptionInList = optionsCartoes.find(option => option.label === selectedOption.label);
    if (selectedOptionInList) return selectedOptionInList;
    return selectedOption;
  }, [selectedOption, optionsCartoes]);


  function handleSubmit(data) {  
    dispatch(
      changeloading({
        open: true,
        msg: "carregando..."
      })
    );
    AlocarService.alocarSaldoIndividual(data)
      .then(() => {
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: 'Valor alocado com sucesso!'
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
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Alocar Valores para um cartão apenas</Typography>
      </Box>
      <Box component={Paper} padding={4} elevation={3}>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >

            <Grid item xs={12} md={3}marginTop='27px'>
              <Autocomplete
                openText='Abrir'
                closeText='Fechar'
                noOptionsText='Sem opções'
                loadingText='Carregando...'
                disablePortal
                loading={isLoading}
                options={optionsCartoes}
                getOptionLabel={(option) => option.label}
                value={autoCompleteSelectedOption}
                onChange={(_, newValue) => setSelectedOption(newValue)}
                inputValue={autoCompleteSelectedOption?.label || ''}
                onInputChange={(_, newInputValue) => setSelectedOption({ label: newInputValue })}
                popupIcon={isLoading ? <CircularProgress size={28} /> : undefined}
              

                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...register("numero_cartao")}
                    label='Cartao'
                    variant='outlined'
                    fullWidth
                    size="small"
                  />
                )}
              />
              <Typography variant='subtitle2'>{errors?.numero_cartao?.message}</Typography>
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
                id='saldo'
                variant='outlined'
                fullWidth
                {...register("saldo")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskValor(e.target.value);
                  setValue("saldo", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.saldo?.message}</Typography>
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




    </Box>

  )
}

export default AlocarValoresIndividual;