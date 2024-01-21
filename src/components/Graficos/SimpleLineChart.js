import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TotalMes } from '../../services';
import { Box, Paper, Typography } from '@mui/material';
import { MaskValor } from '../../utils/mascaras';

const SimpleLineChart = () => {
  const [totalmes, setTotalMes] = useState([]);

  const mesesNomes = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dez',
  };

  async function getTotalAno() {
    const res = await TotalMes.getTotalAno();
    if (res && res.total_taxas_por_mes) {
      const mesesDoAno = Array.from({ length: 12 }, (_, index) => index + 1);
      const dadosCompletos = mesesDoAno.map((mes) => ({
        mes: mesesNomes[mes],
        total_taxas: res.total_taxas_por_mes[mes] || 0,
      }));
      setTotalMes(dadosCompletos);
    }
  }

  useEffect(() => {
    getTotalAno();
  }, []);

  return (
    <Box component={Paper} padding={2} elevation={5} bgcolor='#003366' width='100%'>
      <Typography variant='h4' color="#cecece" marginLeft={25}>Grafico movimentação anual</Typography>
      <LineChart width={550} height={300} data={totalmes} margin={{ top: 20, right: 30, left: 5, bottom: 10 }}  >
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#cecece" />
        <XAxis dataKey="mes" stroke="#cecece" />
        <YAxis />
        <Tooltip formatter={(value) => MaskValor(Number(value))} />
        <Legend stroke="#cecece" />
        <Line type="monotone" dataKey="total_taxas" stroke="green" strokeWidth={5} dot={{ r: 5 }} activeDot={{ r: 8 }} name='Entradas' />
      </LineChart>
    </Box>
  );
};

export default SimpleLineChart;
