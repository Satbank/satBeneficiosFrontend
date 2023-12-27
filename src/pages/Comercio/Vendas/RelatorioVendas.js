import { Box, Paper, Select, MenuItem, InputLabel, Typography, Grid, Button } from '@mui/material';
import React, { useState } from 'react';
import { TableComponet } from '../../../components';
import { Movimentacao_cliente_comercio } from '../../../services';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../../store/actions/loading.action';
import * as XLSX from 'xlsx';

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
    label: 'Valor',
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
];

function RelatorioVendas() {

  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState('1');
  const [relatorios, setRelatorios] = useState([]);
  const [mounted, setMounted] = useState(true);
  const dispatch = useDispatch();

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

  return (
    <Box>
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <Box component={Paper} elevation={5} padding={2}>
            <Typography variant='h1'>Escolha as datas para o relatorio </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={2}>
          <InputLabel sx={{ color: 'black', fontSize: '22px' }}>Selecionar dias</InputLabel>
          <Select fullWidth value={selectedDays} onChange={(e) => setSelectedDays(e.target.value)}>
            <MenuItem value={"1"}>Hoje</MenuItem>
            <MenuItem value={"7"}>Esta semana</MenuItem>
            <MenuItem value={"30"}>Últimos 30 dias</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={2} marginTop='35px'>
          <Button fullWidth variant='contained' color='secondary' size='large' onClick={exportToExcel}>
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
            />
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}

export default RelatorioVendas;
