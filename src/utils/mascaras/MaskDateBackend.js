export const MaskDateBackend = (data) => {
  // Verifica se a data é válida
  if (!data || typeof data !== 'string') return '';

  // Cria um objeto de data a partir da string
  const dateObject = new Date(data);

  // Extrai o dia, mês e ano da data
  const day = String(dateObject.getDate()).padStart(2, '0');
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Mês é baseado em zero
  const year = String(dateObject.getFullYear());

  // Formata a data no formato DD/MM/AAAA
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
