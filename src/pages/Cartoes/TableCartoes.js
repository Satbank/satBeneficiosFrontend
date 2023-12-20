import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import { TableComponet } from '../../components';
import { CartaoService } from '../../services';

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
    id: "numero_cartao",
    label: "Cartão",
    props: {
      align: 'right',
    },
  },

  {
    id: 'saldo',
    label: 'Saldo disponivel',
    props: {
      align: 'right',
    },
  },
  {
    id: 'status',
    label: 'Status',
    props: {
      align: 'right',
    },
  },
  {
    id: 'data_emissao',
    label: 'Data emissao',
    props: {
      align: 'right',
    },
  },
  {
    id: 'data_validade',
    label: 'Validade',
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

function TableCartoes() {

  const [cartoes, setCartoes] = useState([])
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPages] = useState(0);



  return (
    <Box component={Paper}>
      <TableComponet
        headers={headers}
        data={cartoes}
        labelCaption={'Nenhum cliente encontrado!!'}
        labelTable={'Cartoes'}
        handlerEditarAction={''}
        handlerDeletarAction={''}
        request
        qdtPage={totalPage}
        loading={loading}
        setData={setCartoes}
        handlerRequest={async (page, size) => {
          setLoading(true)
          CartaoService.getCartoes('', page, size).then(
            (data) => {    
              console.log('aqui saporra',data)          
              setLoading(false)
              setCartoes(data.data || [])
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

export default TableCartoes;