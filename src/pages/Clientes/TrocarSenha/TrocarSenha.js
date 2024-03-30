import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, IconButton, InputAdornment, Select, MenuItem, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CartaoService, ClientesService } from '../../../services';
import { grey } from '@mui/material/colors';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';
import { changeNotify } from '../../../store/actions/notify.actions';

const schema = yup.object().shape({
  senhaAntiga: yup
    .number()
    .typeError('A senha antiga deve ser um número')
    .required('A senha antiga é obrigatória')
    .positive('O valor da senha antiga deve ser positivo')
    .integer('O valor da senha antiga deve ser um número inteiro')
    .test('len', 'A senha antiga deve ter exatamente 6 caracteres numéricos', val => val && val.toString().length === 6),
  novaSenha: yup
    .string()
    .required('A nova senha é obrigatória')
    .matches(/^\d{6}$/, 'A nova senha deve ter exatamente 6 caracteres numéricos'),
  confirmaSenha: yup
    .string()
    .oneOf([yup.ref('novaSenha'), null], 'As senhas devem coincidir'),
});

function TrocarSenha() {
  const { register, handleSubmit, formState: { errors } , reset} = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const [cartaoSelecionado, setCartaoSelecionado] = useState('');
  const [cartao, setCartao] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCartoes() {
      const res = await ClientesService.trazerSaldoCartao();
      if (res) setCartao(res);
    }
  
    fetchCartoes();
  }, []);
  

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const onSubmit = (data) => {
    dispatch(changeloading({ open: true, msg: "trocando senha..." }));
    CartaoService.trocarSenhaCartao(data)
      .then(() => {
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: "success", msg: 'senha atualizada ' }));
        reset();
        navigate("/dashboard/cliente");
      })
      .catch((error) => {
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: "error", msg: error.response.data.error }));
      });
   
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{
        background: 'linear-gradient(to bottom, #000000, #1C2335 30%, #162F6E 70%, #1C2335)',
        width: '100%',
        height: '80vh',
      }}
    >
      <Card sx={{ backgroundColor: '#1C2335' }}>
        <CardContent sx={{ backgroundColor: '#1C2335' }}>
          <Box display='flex' flexDirection='column' gap={2} width={380} height={400} alignItems='center'>

            <Typography variant='h2' fontSize='30px!important'>Trocar senha do cartão </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>

              <Box display="flex" flexDirection="column" width={300}>
                <Box>
                <InputLabel sx={{color:grey[200]}} id="tipo_cartao">Selecione o  cartão </InputLabel>
                  <Select
                    label="Selecione o cartao"
                    id='cartao'
                    variant='outlined'
                    fullWidth
                    value={cartaoSelecionado}
                    {...register("numero_cartao")}
                    size='small'
                    onChange={(e) => {
                      setCartaoSelecionado(e.target.value);
                    }}
                  >
                    {cartao.map((cartao) => (
                      <MenuItem key={cartao.id} value={cartao.cartao}>
                        {cartao.cartao}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography fontSize='10px!important' color='#F65C5C'>{errors?.senhaAntiga?.message}</Typography>
                </Box>
                <Box marginTop="20px">
                  <TextField
                    label="Senha Antiga"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    {...register("senhaAntiga")}
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography fontSize='10px!important' color='#F65C5C'>{errors?.senhaAntiga?.message}</Typography>
                </Box>

                <Box marginTop="20px">
                  <TextField
                    label="Nova Senha"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    {...register("novaSenha")}
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography fontSize='10px!important' color='#F65C5C'>{errors?.novaSenha?.message}</Typography>
                </Box>

                <Box marginTop="20px">
                  <TextField
                    label="Confirme Senha"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    {...register("confirmaSenha")}
                    size='small'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Typography fontSize='10px!important' color='#F65C5C'>{errors?.confirmaSenha?.message}</Typography>
                </Box>
                <Box marginTop="20px">
                  <Button type='submit' variant='contained' fullWidth>Enviar</Button>
                </Box>

              </Box>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TrocarSenha;
