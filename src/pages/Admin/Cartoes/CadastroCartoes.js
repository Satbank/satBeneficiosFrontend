import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import QRCode from 'react-qr-code';

import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import { MaskCartao, MaskDate, MaskValor } from '../../../utils/mascaras';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';
import { CartaoService } from '../../../services';
import ClientesService from '../../../services/clientes/ClientesService';
import { useDebounce } from '../../../hooks/UseDebounce';

import GeradorNumeros from '../../../utils/GeradorNumeros'



const schema = yup.object({
  users_id: yup.string().required('O campo é obrigatório!').min(3, 'no minimo 3 caracteres'),
  numero_cartao: yup.string().required('O campo é obrigatório!').min(16, 'no minimo 16 caracteres'),
  tipo_cartao: yup.string().required('O campo é obrigatório!'),
  status: yup.string(),
  senha: yup.string().required('O campo é obrigatório!').min(6,'Deve ter no minimo 6 caracteries')
  
});




function CadastroCartoes() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });
  ;
  const dispatch = useDispatch();
  const [tipoSelecionado, setTipoSelecionado] = useState('cesta_basica');
  const [status, setStatus] = useState('ativo');
  //state de autocomplete
  const [optionsCliente, setOptionsClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { debounce } = useDebounce();

  const [numeroCartaoGerado, setNumeroCartaoGerado] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [senhaPega, setSenhaPega] = useState('');







  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      ClientesService.getClientes(busca)
        .then((res) => {  
          setIsLoading(false);
          setOptionsClientes(res.clientes.map(clientes => ({ id: clientes.users_id, label: clientes.nome, cpf:clientes.cpf })))
        })
    },);
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;
    const selectedOption = optionsCliente.find(optionsCliente => optionsCliente.id === selectedId);
    if (!selectedOption) return null;    
    return selectedOption;
  }, [selectedId, optionsCliente]);




  function handleSubmit(data) {
    let newData = { ...data, users_id: selectedId }  
    dispatch(
      changeloading({
        open: true,
        msg: "carregando..."
      })
    );
    CartaoService.create(newData)
      .then((res) => {
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

        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: error.response.data.error
          })
        );
      });
  };

  const handleGenerateCard = () => {
    const nomeCliente = autoCompleteSelectedOption ? autoCompleteSelectedOption.label : 'Cliente';  
    // Usa o html2canvas para capturar a parte específica do componente como uma imagem
    html2canvas(document.getElementById('card-container')).then((canvas) => {
      // Converte o canvas em um blob
      canvas.toBlob((blob) => {
        // Define o nome do arquivo com o nome do cliente
        const nomeArquivo = `cartao_${nomeCliente}.png`;  
        // Usa o FileSaver para fazer o download do blob como um arquivo PNG
        saveAs(blob, nomeArquivo);
      });
    });
  };

  const handleClientSelection = (_, newValue) => {  
    setSelectedId(newValue?.id);
    setBusca('');
    // Pega os 6 primeiros dígitos do CPF do cliente selecionado
    const cpf = newValue?.cpf || '';
    const sixDigitsCpf = cpf.substring(0, 6);
        // Armazena a senha temporariamente no estado
        setSenhaPega(sixDigitsCpf);

    // Preenche o campo de senha com os 6 primeiros dígitos do CPF
    setValue('senha', sixDigitsCpf, { shouldValidate: true });
  };
  return (
    <Box>
      <Box component={Paper} padding={2} marginBottom={5}>
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Cadastrar Novo Cartão </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Box component={Paper} padding={2} sx={{ backgroundColor: '#1C2335' }}>
            <Typography marginBottom={2} variant='h2'>Cartão</Typography>
            <form onSubmit={onSubmit(handleSubmit)}>
              <Grid container spacing={2} alignItems="center" justify="center">

                <Grid item xs={12} md={5}>
                  <Autocomplete
                    openText='Abrir'
                    closeText='Fechar'
                    noOptionsText='Sem opções'
                    loadingText='Carregando...'
                    disablePortal
                    loading={isLoading}
                    options={optionsCliente}
                    onChange={handleClientSelection}
                    onInputChange={(_, newValue) => setBusca(newValue)}
                    popupIcon={isLoading ? <CircularProgress size={28} /> : undefined}
                    value={autoCompleteSelectedOption}

                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...register("users_id")}
                        label='Nome'
                        variant='outlined'
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                  <Typography variant='subtitle2'>{errors?.users_id?.message}</Typography>
                </Grid>


                <Grid item xs={12} md={5}>
                  <TextField
                    label='Numero do cartão'
                    id='numero_cartao'
                    variant='outlined'
                    fullWidth
                    {...register("numero_cartao")}
                    size="small"
                    value={numeroCartao || numeroCartaoGerado}
                    onChange={(e) => {
                      const maskedValue = MaskCartao(e.target.value);
                      setNumeroCartao(maskedValue);
                      setValue("numero_cartao", maskedValue, { shouldValidate: true });
                    }}
                  />


                  <Typography variant='subtitle2'>{errors?.numero_cartao?.message}</Typography>
                </Grid>

                <Grid item xs={12} md={2} >
                  <GeradorNumeros setNumeroCartao={setNumeroCartaoGerado} />
                </Grid>

                <Grid item xs={12} md={3}>
                <InputLabel sx={{ color: 'white' }} htmlFor='tipo'>Senha</InputLabel>
                  <TextField
                    label='Senha do cartão'
                    id='senha'
                    variant='outlined'
                    fullWidth
                    {...register("senha")}
                    size="small"   
                    value={senhaPega} 
                  />
                  <Typography variant='subtitle2'>{errors?.senha?.message}</Typography>
                </Grid>

                <Grid item xs={6} md={3}>
                  <InputLabel sx={{ color: 'white' }} htmlFor='tipo'>Tipo</InputLabel>
                  <Select
                    label='Tipo'
                    id='tipo_cartao'
                    variant='outlined'
                    fullWidth
                    {...register('tipo_cartao')}
                    size='small'
                    value={tipoSelecionado}
                    onChange={(e) => {
                      setTipoSelecionado(e.target.value); // Atualiza o estado tipoSelecionado
                      setValue('tipo_cartao', e.target.value); // Atualiza o valor usando setValue do useForm
                    }}
                  >
                    <MenuItem value={'cesta_basica'}>Cesta basica</MenuItem>
                    <MenuItem value={'esporte'}>Esporte</MenuItem>
                  </Select>
                  <Typography variant='subtitle2'>{errors?.tipo_cartao?.message}</Typography>
                </Grid>


                <Grid item xs={6} md={3}>
                  <InputLabel sx={{ color: 'white' }} htmlFor='tipo'>Status</InputLabel>
                  <Select
                    label='Status'
                    id='status'
                    variant='outlined'
                    fullWidth
                    {...register("status")}
                    size="small"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value); // Atualiza o estado status
                      setValue("status", e.target.value); // Atualiza o valor usando setValue do useForm
                    }}
                  >
                    <MenuItem value={'ativo'}>Ativo</MenuItem>
                    <MenuItem value={'inativo'}>Inativo</MenuItem>
                    <MenuItem value={'bloqueado'}>Bloqueado</MenuItem>
                  </Select>
                  <Typography variant='subtitle2'>{errors?.status?.message}</Typography>
                </Grid>

               

                <Grid item xs={12} md={3} marginTop='27px'>
                  <TextField
                    label='Data de validade'
                    id='data_validade'
                    variant='outlined'
                    fullWidth
                    value={dataValidade}
                    {...register("data_validade")}
                    size="small"
                    onChange={(e) => {
                      const maskedValue = MaskDate(e.target.value);
                      setDataValidade(maskedValue);
                      setValue("data_validade", maskedValue, { shouldValidate: true });
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

        </Grid>

        {/* Segundo contêiner Grid com o Typography */}
        <Grid item xs={12} md={5} marginTop='29px'>
          <Box id="card-container" component={Paper} sx={{ flexGrow: 1, backgroundColor: '#1C2335' }} paddingBottom={2}>
            <Grid container spacing={2} alignItems="center" justify="center" paddingLeft={5} paddingTop={5}>

              <Grid item xs={12} md={12}>
                <Box marginBottom={2} >
                  <Typography variant='subtitle1'>Logo Tipo</Typography>
                </Box>
              </Grid>

              <Grid item xs={5} md={6}>
                <Box marginBottom={2} >
                  <Typography variant='subtitle1'>{numeroCartao || numeroCartaoGerado || 'Numero do cartão'}</Typography>
                </Box>
              </Grid>

              <Grid item xs={1} md={2}>
                <Box >
                
                </Box>
              </Grid>

              <Grid item xs={6} md={4}>
                <Box marginLeft={3} backgroundColor='#fff' width={85}>
                  <Box paddingLeft='5px' paddingTop='3px'>
                    <QRCode value={numeroCartao || numeroCartaoGerado} size={75} />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant='subtitle1'>{autoCompleteSelectedOption ? autoCompleteSelectedOption.label : 'Nome do Cliente'}</Typography>
              </Grid>

              <Grid item xs={6} md={6}>
                <Typography variant='subtitle1'>{dataValidade || 'Data de Validade'}</Typography>
              </Grid>


            </Grid>
          </Box>
          <Grid item xs={12} md={12} marginTop={2}>
            <Box textAlign="center">
              <Button type='button' onClick={handleGenerateCard} variant='contained' sx={{ width: '25%' }} >Baixar</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

    </Box>
  );
}

export default CadastroCartoes

  ;
