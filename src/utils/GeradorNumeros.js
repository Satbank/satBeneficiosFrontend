import { Button } from '@mui/material';
import React from 'react';
import { MaskCartao } from '../utils/mascaras'

const GeradorNumeros = ({ setNumeroCartao }) => {
  const gerarNumerosAleatorios = () => {
    const binFixo = '120989'; // Substitua pelo seu BIN fixo
    const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
    const numeroCartaoGerado = binFixo + randomNumbers.join('');
    const numeroCartaoComMascara = MaskCartao(numeroCartaoGerado);
    setNumeroCartao(numeroCartaoComMascara);
  };

  return (
    <Button variant='contained'  onClick={gerarNumerosAleatorios}>Gerar</Button >
  );
};

export default GeradorNumeros;
