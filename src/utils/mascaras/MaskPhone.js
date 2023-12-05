export const MaskPhone = (phone) => {
  // Remove caracteres não numéricos
  const onlyNumbers = phone.replace(/\D/g, '');

  // Mantém apenas os primeiros 11 caracteres
  const truncatedPhone = onlyNumbers.slice(0, 11);

  // Aplica a máscara de telefone
  if (truncatedPhone.length <= 11) {
    return truncatedPhone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(truncatedPhone.length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
  }

  return phone;
};
