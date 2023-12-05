export const MaskInscricaoEstadual = (inscricaoEstadual) => {
  // Remove caracteres não numéricos
  const onlyNumbers = inscricaoEstadual.replace(/\D/g, '');

  // Aplica a máscara de Inscrição Estadual apenas se houver pelo menos 3 dígitos
  if (onlyNumbers.length >= 3) {
    // Mantém apenas os primeiros 12 caracteres
    const truncatedInscricaoEstadual = onlyNumbers.slice(0, 12);

    return truncatedInscricaoEstadual.replace(/(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3');
  }

  return onlyNumbers;
};
