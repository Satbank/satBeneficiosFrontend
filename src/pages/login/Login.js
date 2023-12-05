
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
// react hook form
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


import Logo from "../../image/logomarca.png"
import { login } from '../../store/actions/auth.actions';
import { changeNotify } from "../../store/actions/notify.actions";
import { isAuthenticated } from '../../utils/AuthHelp';

const schema = yup
    .object({
        username: yup.string().email().required('obrigatorio'),
        password: yup.string().required('campo obrigatorio').min(5,'a senha tem que ter pelo menos 5 caracteries'),
    })

export default function Login() {

    const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();

    const dispatch = useDispatch();
    //função que faz o login, pega de action.auth a função login e recebe as credenciais.
    const handleSubmit = (credentials) => {
        dispatch(login(credentials))
          .then(() => {
            // Verifica se o usuário está autenticado antes de redirecionar
            if (isAuthenticated()) {
              navigate("/dashboard");
              dispatch(changeNotify({
                open: true,
                class: "success",
                msg: "Seja Bem Vindo!"
              }));
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
            sx={{ background: 'linear-gradient(to bottom,   #000000, #1C2335 30%, #162F6E 70%, #003DDF ,#1C2335)', }}>
            <Card sx={{backgroundColor: '#1C2335'}}>
                <CardContent sx={{ backgroundColor: '#1C2335' }}>
                    <Box display='flex' flexDirection='column' gap={2} width={420} height={400} alignItems='center' >
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
                                    <Typography color='#F65C5C'>{errors?.username?.message}</Typography>
                                </Box>

                                <Box marginTop="20px">
                                    <TextField
                                        label="Senha"
                                        type="password"
                                        fullWidth
                                        {...register("password")}
                                        color="secondary"
                                        sx={{ backgroundColor: '#E5E5E5', borderRadius: '6px' }}
                                    />
                                    <Typography color='#F65C5C'>{errors?.password?.message}</Typography>
                                </Box>
                                <Box marginTop="40px">
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