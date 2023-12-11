export const MaskCartao = (cardNumber) => {
  // Remove caracteres não numéricos
  const onlyNumbers = cardNumber.replace(/\D/g, '');

  // Mantém apenas os primeiros 16 caracteres
  const truncatedCardNumber = onlyNumbers.slice(0, 16);

  // Adiciona espaços a cada 4 dígitos
  const formattedCardNumber = truncatedCardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');

  return formattedCardNumber;
};
