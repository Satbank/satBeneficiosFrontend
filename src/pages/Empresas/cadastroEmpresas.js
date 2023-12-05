import { Box, Button, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';

import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { MaskCnpj, MaskInscricaoEstadual, MaskPhone } from '../../utils/mascaras';

import { useDispatch } from 'react-redux';
import { EmpresaService, PrefeituraService } from '../../services';
import { changeloading } from '../../store/actions/loading.action';
import { changeNotify } from '../../store/actions/notify.actions';
import { useEffect, useState } from 'react';

const schema = yup.object({
  razao_social: yup.string().required('O campo é obrigatório!'),
  cnpj: yup.string().required('O campo é obrigatório!'),
  inscricao_estadual: yup.string().required('O campo é obrigatório!'),
  cidade: yup.string().min(3),
  uf: yup.string().max(2,'maximo 2 caracteres ex: GO')
});




function CadastroEmpresas() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const [prefeituraSelecionada, setPrefeituraSelecionada] = useState('');
  const [prefeituras, setPrefeituras] = useState([]);

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
    EmpresaService.create(data)
      .then((res) => {   
        dispatch(changeloading({ open: false }));
        dispatch(
          changeNotify({
            open: true,
            class: "success",
            msg: 'Comercio cadastrado com sucesso !'
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
            msg: 'Erro ao cadastrar comercio !'
          })
        );
      });
  };

  return (
    <Box>
      <Box component={Paper} padding={2}>
        <Typography variant='h2' sx={{ fontSize: '30px!important' }}>Cadastrar Nova Empresa </Typography>
      </Box>
      <Box component={Paper} sx={{ flexGrow: 1, backgroundColor: '#D9D9D9' }} marginTop={2} padding={3} display="flex" flexDirection="column" alignItems="center">
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} md={6}>
              <TextField
                label='Razão Social'
                id='razao_social'
                variant='outlined'
                fullWidth
                {...register("razao_social")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.razao_social?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label='Nome Fantasia'
                id='nome_fantasia'
                variant='outlined'
                fullWidth
                {...register("nome_fantasia")}
                size="small"
              />
              <Typography variant='subtitle2'>{errors?.nome_fantasia?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={5}>
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

            <Grid item xs={6} md={4}>
              <TextField
                label='Inscrição Estadual'
                id='inscricao_estadual'
                variant='outlined'
                fullWidth
                {...register("inscricao_estadual")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskInscricaoEstadual(e.target.value);
                  setValue("inscricao_estadual", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.inscricao_estadual?.message}</Typography>
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

            <Grid item xs={12} md={4}>

              <Select
                label='prefeitura'
                id='prefeitura_id'
                variant='outlined'
                fullWidth
                {...register('prefeitura_id')}
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

export default CadastroEmpresas;
