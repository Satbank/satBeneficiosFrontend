export const MaskCpf = (cpf) => {
  // Remove caracteres não numéricos
  const onlyNumbers = cpf.replace(/\D/g, '');

  // Mantém apenas os primeiros 11 caracteres
  const truncatedCpf = onlyNumbers.slice(0, 11);

  // Aplica a máscara de CPF apenas se o comprimento for menor ou igual a 11
  if (truncatedCpf.length === 11) {
    return truncatedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }

  return truncatedCpf;
};
