
import { useDispatch, } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
// react hook form
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


import Logo from "../../image/logomarca.png"
import { login } from '../../store/actions/auth.actions';
import { changeNotify } from "../../store/actions/notify.actions";
import { isAuthenticated } from '../../utils/AuthHelp';
import { UserDataService } from "../../services";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from "react";



const schema = yup
  .object({
    username: yup.string().email().required('obrigatorio'),
    password: yup.string().required('campo obrigatorio').min(5, 'a senha tem que ter pelo menos 5 caracteries'),
  })

function Login() {

  const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  //função que faz o login, pega de action.auth a função login e recebe as credenciais.
  const handleSubmit = (credentials) => {
    dispatch(login(credentials))
      .then(() => {
        // Verifica se o usuário está autenticado antes de redirecionar
        if (isAuthenticated()) {
          UserDataService.getUser()
            .then((data) => {
              const { perfils_id } = data
              dispatch(changeNotify({
                open: true,
                class: "success",
                msg: "Seja Bem Vindo!"
              }));
              switch (perfils_id) {
                case 1:
                  navigate("/dashboard/admin");
                  break;
                case 2:
                  navigate("/dashboard/prefeitura");
                  break;
                case 3:
                  navigate("/dashboard/comercio");
                  break;
                case 4:
                  navigate("/dashboard/cliente");
                  break;
                default:
                  break;
              }

            })
        } else {
          // Trata o caso em que o usuário não está autenticado
          dispatch(changeNotify({
            open: true,
            class: "error",
            msg: "Email ou senha incorretos."
          }));
        }
      })
      .catch((error) => {
        // Trata outros erros
        dispatch(changeNotify({
          open: true,
          class: "error",
          msg: "Erro ao se conectar ao servidor"
        }));
      });
  };



  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
      sx={{ background: 'linear-gradient(to bottom,   #000000, #1C2335 30%, #162F6E 70%, #1C2335)', }}>
      <Card sx={{ backgroundColor: '#1C2335' }}>
        <CardContent sx={{ backgroundColor: '#1C2335' }}>
          <Box display='flex' flexDirection='column' gap={2} width={380} height={400} alignItems='center' >
            <CardMedia
              component="img"
              height={100}
              image={Logo}
              alt="logo"

            />
            <form onSubmit={onSubmit(handleSubmit)}>
              <Box display="flex" flexDirection="column" width={300}>
                <Box marginTop="20px">
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("username")}
                    autoComplete='email'
                    color="secondary"
                    sx={{ backgroundColor: '#E5E5E5', borderRadius: '6px' }}
                  />
                  <Typography fontSize='13px' color='#F65C5C'>{errors?.username?.message}</Typography>
                </Box>

                <Box marginTop="20px">
                  <TextField
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    {...register("password")}
                    color="secondary"
                    sx={{ backgroundColor: '#E5E5E5', borderRadius: '6px' }}
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
                  <Typography fontSize='13px' color='#F65C5C'>{errors?.password?.message}</Typography>
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
  )

}

export default (Login);