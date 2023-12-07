import { Box, Paper} from '@mui/material';
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
  const [mounted, setMounted] = useState(true);
  const dispatch = useDispatch();

//  função que faz a busca no backend para tabela de clientes 
  async function getClientes() {
    const res = await ClientesService.getClientes();
  
    if (res) {
      setClientes(res.clientes);
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
        await getClientes();
  
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
        data={clientes}
        labelCaption={'Nenhum cliente encontrado!!'}
        labelTable={'Clientes'}
        handlerEditarAction={''}
        handlerDeletarAction={''}      
     />
   </Box>

  );
 
  

}

export default TableClientes;