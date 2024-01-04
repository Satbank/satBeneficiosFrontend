import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Paper } from '@mui/material';
import { TableComponet } from '../../../components';
import { EmpresaService } from '../../../services';
import { changeloading } from '../../../store/actions/loading.action';

//linhas da tabela
const headers = [
  {
    id: "razao_social",
    label: "Razão social",
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
    id: 'cnpj',
    label: 'Cnpj',
    props: {
      align: 'right',
    },
  },
  {
    id: 'nome_fantasia_prefeitura',
    label: 'Prefeitura',
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

function TableComercio() {
  const [empresas, setEmpresas] = useState([])
  const [mounted, setMounted] = useState(true);
  const dispatch = useDispatch();

  //função que faz as buscar no backend para tabela de comercios 
  async function getComercios() {
    const res = await EmpresaService.getEmpresas();

    if (res) {
      setEmpresas(res.comercios);
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(
        changeloading({
          open: true,
          msg: "Carregando",
        })
      );

      if (mounted) {
        await getComercios();

        dispatch(
          changeloading({
            open: false,
          })
        );
      }
    };

    fetchData();
    return () => {
      setMounted(false);
    };
  }, [dispatch, mounted]);



  return (
    <Box component={Paper}>
      <TableComponet
        headers={headers}
        data={empresas}
        labelCaption={'Nenhum produto encontrado!!'}
        labelTable={'Empresas'}
        handlerEditarAction={''}
        handlerDeletarAction={''}
      />
    </Box>

  );



}

export default TableComercio;