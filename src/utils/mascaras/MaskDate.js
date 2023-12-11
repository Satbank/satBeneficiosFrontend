export const MaskDate = (data) => {
  // Remove caracteres não numéricos
  const onlyNumbers = data.replace(/\D/g, '');

  // Obtém os grupos de dois dígitos para dia, mês e ano
  const day = onlyNumbers.slice(0, 2);
  const month = onlyNumbers.slice(2, 4);
  const year = onlyNumbers.slice(4, 8);

  // Formata a data
  const formattedDate = `${day.length > 0 ? day + '/' : ''}${month.length > 0 ? month + '/' : ''}${year}`;

  return formattedDate;
};
