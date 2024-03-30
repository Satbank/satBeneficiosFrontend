import accounting from 'accounting';

export const MaskValor = (value) => {
  // Certifique-se de que value é uma string
  const stringValue = String(value);

  // Remove todos os caracteres não numéricos
  const onlyNumbers = stringValue.replace(/[^\d]/g, '');

  // Se não houver números restantes, retorna uma string vazia
  if (!onlyNumbers) return '';

  // Converte o valor para um número
  const numberValue = parseFloat(onlyNumbers) / 100; // Divide por 100 para obter o valor correto

  // Formata o número usando o accounting.js
  const formattedValue = accounting.formatMoney(numberValue, {
    symbol: 'R$',  // Define o símbolo da moeda como vazio
    precision: 2, // Define a precisão para 2 casas decimais
    thousand: '.', // Define o separador de milhares como '.'
    decimal: ',', // Define o separador decimal como ','
    format: '%v', // Usa o formato '%v' para retornar somente o valor
  });

  return formattedValue;
};
