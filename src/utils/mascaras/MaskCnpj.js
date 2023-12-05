export const MaskCnpj = (cnpj) => {
  // Remove caracteres não numéricos
  const onlyNumbers = cnpj.replace(/\D/g, '');

  // Mantém apenas os primeiros 14 caracteres
  const truncatedCnpj = onlyNumbers.slice(0, 14);

  // Aplica a máscara de CNPJ apenas se o comprimento for menor ou igual a 14
  if (truncatedCnpj.length === 14) {
    return truncatedCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
  }

  return truncatedCnpj;
};
