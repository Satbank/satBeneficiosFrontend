import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import { TableComponet } from '../../components';
import { changeloading } from '../../store/actions/loading.action';
import { useDispatch } from 'react-redux';
import { ClientesService } from '../../services';



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
    id: 'cartao',
    label: 'Cartões',
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

  const dispatch = useDispatch();  

  return (
    <Box component={Paper}>
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

  );



}

export default TableClientes;