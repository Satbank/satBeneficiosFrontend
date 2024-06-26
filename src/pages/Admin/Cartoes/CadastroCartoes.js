import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box, Button, CircularProgress, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import QRCode from 'react-qr-code';

import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import { MaskCartao, MaskDate } from '../../../utils/mascaras';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';
import { CartaoService } from '../../../services';
import ClientesService from '../../../services/clientes/ClientesService';
import { useDebounce } from '../../../hooks/UseDebounce';
import satbanckCartaoBenefeicio from "../../../image/satbanckCartaoBenefeicio.jpg"
import GeradorNumeros from '../../../utils/GeradorNumeros'



const schema = yup.object({
  users_id: yup.string().required('O campo é obrigatório!').min(3, 'no minimo 3 caracteres'),
  //numero_cartao  : yup.string().required('O campo é obrigatório!').min(16, 'no minimo 16 caracteres'),
  tipo_cartao: yup.string().required('O campo é obrigatório!'),
  status: yup.string(),
  senha: yup.string().required('O campo é obrigatório!').min(6, 'Deve ter no minimo 6 caracteries')

});




function CadastroCartoes() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      users_id: '',
      numero_cartao: '',
      senha: '',
      // ... outros campos
    },
  });

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
          setOptionsClientes(res.clientes.map(clientes => ({ id: clientes.users_id, label: clientes.nome, cpf: clientes.cpf })))
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
    let newData = { ...data, users_id: selectedId, numero_cartao: numeroCartaoGerado };

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

        // Resetar manualmente os valores dos campos
        setValue('users_id', '');
        setValue('numero_cartao', '');
        setValue('senha', '');
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        let errorMessage = "";

        if (error.response.data.errors && error.response.data.errors.numero_cartao) {
          errorMessage = error.response.data.errors.numero_cartao[0];
        } else {
          errorMessage = error.response.data.message || "Erro desconhecido";
        }

        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: errorMessage
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



  useEffect(() => {
    const currentDate = new Date();
    const fourYearsLater = new Date(currentDate.getFullYear() + 4, currentDate.getMonth(), currentDate.getDate());
    const formattedDate = `${fourYearsLater.getDate().toString().padStart(2, '0')}/${(fourYearsLater.getMonth() + 1).toString().padStart(2, '0')}/${fourYearsLater.getFullYear()}`;
    setDataValidade(formattedDate);
    setValue('data_validade', formattedDate);
  }, []);

  return (
    <Box>
      <Box component={Paper} padding={2} marginBottom={5}>
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Cadastrar Novo Cartão </Typography>
      </Box>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12} md={12}>
          <Box component={Paper} padding={2} sx={{ backgroundColor: '#1C2335' }}>
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
                  <Typography variant='subtitle2'>{errors?.data_validade?.message}</Typography>
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

        <Grid item xs={12} md={5} >
          <Box
            id="card-container"
            component={Paper}
            sx={{
              width: '115.60mm',
              height: '69.98mm',
              backgroundImage: `url(${satbanckCartaoBenefeicio})`,
              backgroundSize: 'cover',
              position: 'relative',  // Habilita o posicionamento absoluto
            }}
          >
            {/* Conteúdo do componente */}
            <Typography
              variant='subtitle1'
              color='#150A59!important'
              fontSize='17px!important'
              sx={{
                position: 'absolute',
                top: '100px',
                left: '15px',
                fontWeight: 'bold',
              }}
            >
              {numeroCartao || numeroCartaoGerado || 'Numero do cartão'}
            </Typography>

            <Typography
              variant='subtitle1'
              color='black'
              fontSize='14px!important'
              sx={{
                position: 'absolute',
                top: '135px',
                right: '300px',
              }}
            >
              {dataValidade || 'Data de Validade'}
            </Typography>

            <Typography
              variant='subtitle1'
              color='black'
              fontSize='14px!important'
              sx={{
                position: 'absolute',
                top: '135px',
                right: '215px',
              }}
            >
              999
            </Typography>

            <Typography
              variant='subtitle1'
              color='#150A59!important'
              sx={{
                position: 'absolute',
                bottom: '58px',
                left: '18px',
                fontWeight: 'bold',

              }}
            >
              {autoCompleteSelectedOption ? autoCompleteSelectedOption.label : 'Nome do Cliente'}
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                bottom: '23px',
                right: '165px',
                backgroundColor: '#fff',
                paddingLeft: '5px',
                paddingTop: '3px',
              }}
            >
              <QRCode value={numeroCartao || numeroCartaoGerado} size={65} />
            </Box>
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
