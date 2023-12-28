import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Grid, Modal, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import * as yup from 'yup';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { MaskCartao, MaskValor } from '../../../utils/mascaras';
import { Movimentacao_cliente_comercio } from '../../../services';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';

const schema = yup.object({
  numero_cartao: yup.string().required('O campo é obrigatório!'),
  valor: yup.string().required('O campo é obrigatório!'),
  senha: yup.string().required('O campo é obrigatório!').min(6, 'a senha tem 6 caracteres').max(6, 'a senha tem no maximo 6 caracteres')

});

function Vendas() {
  const { register, handleSubmit: onSubmit, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('md', 'lg'));
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  let paperWidth = '40%'; // Padrão para telas grandes  
  if (isSmallScreen) {
    paperWidth = '100%'; // Para telas pequenas
  } else if (isMediumScreen) {
    paperWidth = '75%'; // Para telas médias
  }


  function handleSubmit(data) {
    dispatch(changeloading({ open: true, msg: "carregando..." }));
    Movimentacao_cliente_comercio.create(data)
      .then(() => {
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: "success", msg: 'Autorizado com sucesso ' }));
        reset();
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: "error", msg: error.response.data.error }));
      });
    handleModalClose();
  };
  return (
    <Box>
      <Box component={Paper} padding={2} marginBottom={5}>
        <Typography variant='h1' sx={{ fontSize: '30px!important' }}>Nova Venda</Typography>
      </Box>

      <Box component={Paper} width={paperWidth} padding={4} elevation={3} sx={{ flexGrow: 1, margin: 'auto', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={onSubmit(handleSubmit)}>
          <Grid container spacing={2} >
            <Grid item xs={12} md={12}>
              <TextField
                label='Numero do cartão'
                id='numero_cartao'
                variant='outlined'
                fullWidth
                {...register("numero_cartao")}
                size="small"
                onChange={(e) => {
                  const maskedValue = MaskCartao(e.target.value);

                  setValue("numero_cartao", maskedValue, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.numero_cartao?.message}</Typography>
            </Grid>

            <Grid item xs={12} md={12} >
              <TextField
                label='R$ Valor'
                id='valor'
                variant='outlined'
                fullWidth
                autoComplete='off'
                {...register("valor")}
                size="small"
                onInput={(e) => {
                  e.target.value = MaskValor(e.target.value);
                  setValue("valor", e.target.value, { shouldValidate: true });
                }}
              />
              <Typography variant='subtitle2'>{errors?.valor?.message}</Typography>
            </Grid>


            <Grid item xs={12} md={12}>
              <Box marginTop={2} textAlign="center">
                <Button type="button" variant="contained" sx={{ width: '40%' }} onClick={handleModalOpen}>
                  Enviar
                </Button>
              </Box>
            </Grid>

          </Grid>
        </form>
      </Box>
      {/* Modal de Senha */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Digite sua senha
          </Typography>
          <form onSubmit={onSubmit(handleSubmit)}>
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              autoComplete="off"
              {...register('senha')}
              size="small"
            />
            <Typography variant="subtitle2">{errors?.senha?.message}</Typography>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              OK
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}




export default Vendas;