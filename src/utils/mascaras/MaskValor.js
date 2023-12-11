export const MaskValor = (value) => {
   // Remove caracteres não numéricos
   const onlyNumbers = value.replace(/\D/g, '');

   // Obtém a parte inteira e decimal
   const intValue = onlyNumbers.slice(0, -2);
   const decimalValue = onlyNumbers.slice(-2);
 
   // Formata o valor em real
   const formattedValue = `R$ ${intValue}${intValue.length > 0 ? '.' : ''}${decimalValue}`;

  return formattedValue;
};
