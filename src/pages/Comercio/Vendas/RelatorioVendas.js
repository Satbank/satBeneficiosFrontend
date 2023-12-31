import React, { useState } from 'react';
import { Box, Paper, Select, MenuItem, InputLabel, Typography, Grid, Button } from '@mui/material';


import { Confirm, TableComponet } from '../../../components';
import { Movimentacao_cliente_comercio } from '../../../services';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';
import * as XLSX from 'xlsx';
import { changeNotify } from '../../../store/actions/notify.actions';

// linhas da tabela
const headers = [
  {
    id: "id",
    label: "Numero da Tranzação",
    props: {
      align: 'center',
    },
  },
  {
    id: "nome",
    label: "Nome",
    props: {
      align: 'left',
    },
  },
  {
    id: 'valor',
    label: 'Valor Recebido',
    props: {
      align: 'left',
    },
  },
  {
    id: 'valor_original',
    label: 'Valor Venda',
    props: {
      align: 'left',
    },
  },
  {
    id: 'status',
    label: 'Status',
    props: {
      align: 'left',
    },
  },
  {
    id: 'data',
    label: 'Data',
    props: {
      align: 'left',
    },
  },
  {
    id: 'actionRows',
    label: 'Estornar Venda',
    props: {
      align: 'right',
    },
  },
];


function RelatorioVendas() {

 
  const [selectedDays, setSelectedDays] = useState('1');
  const [relatorios, setRelatorios] = useState([]);
  const [mounted, setMounted] = useState(true);
  const dispatch = useDispatch();
  const [confirmar, setConfirmar] = React.useState({
    id: null,
    confirmDialogOpen: false,
  });

  async function getRelatorios() {
    const res = await Movimentacao_cliente_comercio.getRelatorios(selectedDays);
    if (res) {
      setRelatorios(res.relatorios);
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
        await getRelatorios();
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

  React.useEffect(() => {
    getRelatorios();
  }, [selectedDays]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(relatorios);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'RelatorioVendas');
    const filename = 'relatorio_vendas.xlsx';
    XLSX.writeFile(wb, filename);
  };

  const handleOpenConfirmDialog = (id) => {
    setConfirmar({ id, confirmDialogOpen: true });
  };

  const handleCloseConfirmDialog = () => {
    setConfirmar({ id: null, confirmDialogOpen: false });
  };

  const handleEstonar = async () => {    
    try {
      dispatch(changeloading({ open: true, msg: "estornando venda..." }));
      await Movimentacao_cliente_comercio.estornar(confirmar.id);
      dispatch(changeloading({ open: false }));
      dispatch(changeNotify({ open: true, class: 'success', msg: 'Estornado com Sucesso' }));
      handleCloseConfirmDialog();
    } catch (error) {      
      dispatch(changeloading({ open: false }));
      dispatch(changeNotify({ open: true, class: 'error', msg:  error.response.data.error}));
    }
  };

  return (
    <Box>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <Box component={Paper} elevation={5} padding={2}>
            <Typography variant='h1'>Escolha as datas para o relatorio </Typography>
          </Box>
        </Grid>

        <Grid item xs={6} md={2}>
          <InputLabel sx={{ color: 'black', fontSize: '22px' }}>Selecionar dias</InputLabel>
          <Select fullWidth size='small' value={selectedDays} onChange={(e) => setSelectedDays(e.target.value)}>
            <MenuItem value={"1"}>Hoje</MenuItem>
            <MenuItem value={"7"}>Esta semana</MenuItem>
            <MenuItem value={"30"}>Últimos 30 dias</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={6} md={2} marginTop='33px'>
          <Button fullWidth variant='contained' color='secondary' onClick={exportToExcel}>
            exportar excel
          </Button>
        </Grid>

        <Grid item xs={12} md={12}>

          <Box marginTop={2} component={Paper} elevation={5} padding={2}>
            <TableComponet
              headers={headers}
              data={relatorios}
              labelCaption={'Nenhuma movimentação encontrada!!'}
              labelTable={'Movimentação'}
              handlerEstornarAction={(event) => { handleOpenConfirmDialog(event) }}
            />
            <Confirm
              open={confirmar.confirmDialogOpen}
              title="Deseja realmente estornar essa venda?"
              onClose={handleCloseConfirmDialog}
              onConfirm={handleEstonar}
            />
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}

export default RelatorioVendas;
