import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, CircularProgress, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TableComponet } from '../../../components';
import { ClientesService } from '../../../services';
import { useDebounce } from '../../../hooks/UseDebounce';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"



//linhas da tabela
const headers = [
  {
    id: "nome",
    label: "Nome",
    props: {
      align: 'left',
    },

  },
  {
    id: "email",
    label: "Email",
    props: {
      align: 'right',
    },
  },

  {
    id: 'cpf',
    label: 'Cpj',
    props: {
      align: 'right',
    },
  },
  {
    id: 'rua',
    label: 'Rua',
    props: {
      align: 'right',
    },
  },
  {
    id: 'numero',
    label: 'Numero',
    props: {
      align: 'right',
    },
  },
  {
    id: 'bairro',
    label: 'Bairro',
    props: {
      align: 'right',
    },
  },
  {
    id: 'complemento',
    label: 'Complemento',
    props: {
      align: 'right',
    },
  },
  {
    id: 'cidade',
    label: 'Cidade',
    props: {
      align: 'right',
    },
  },
  {
    id: 'uf',
    label: 'Uf',
    props: {
      align: 'right',
    },
  },
  {
    id: 'actionRows',
    label: 'Ações',
    props: {
      align: 'right',
    },
  },
];

function TableClientes() {

  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPages] = useState(0);

  const [optionsCliente, setOptionsClientes] = useState([]);
  const [busca, setBusca] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { debounce } = useDebounce();
  const { register } = useForm({ resolver: yupResolver() });

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      ClientesService.getClientes(busca)
        .then((res) => {
          setIsLoading(false);
          setClientes(res.clientes || [])
          setOptionsClientes(res.clientes.map(clientes => ({ id: clientes.users_id, label: clientes.nome, cpf: clientes.cpf })))
        })
    },);
  }, [busca]);


  return (

    <Box >
      <Box component={Paper} padding={1} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant='h1' fontSize='35px!important'>Todos os Clientes</Typography>
        <Autocomplete
          openText='Abrir'
          closeText='Fechar'
          noOptionsText='Sem opções'
          loadingText='Carregando...'
          disablePortal       
          options={optionsCliente}
          onInputChange={(_, newValue) => setBusca(newValue)}       
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("users_id")}
              label='Pesquisar...'
              variant='outlined'
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>

      <Box component={Paper} marginTop={5}>
        <TableComponet
          headers={headers}
          data={clientes}
          labelCaption={'Nenhum cliente encontrado!!'}
          labelTable={'Clientes'}
          handlerEditarAction={''}
          handlerDeletarAction={''}
          request
          qdtPage={totalPage}
          loading={loading}
          setData={setClientes}
          handlerRequest={async (page, size) => {
            setLoading(true)
            ClientesService.getClientes('', page, size).then(
              (data) => {
                setLoading(false)
                setClientes(data.clientes || [])
                setTotalPages(data.totalPages || 0);
                return data
              },
            )
            return []
          }}
        />
      </Box>
    </Box>

  );



}

export default TableClientes;