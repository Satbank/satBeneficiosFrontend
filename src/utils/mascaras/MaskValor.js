export const MaskValor = (value) => {
  // Certifique-se de que value é uma string
  const stringValue = String(value);

  const onlyNumbers = stringValue.replace(/[^\d]/g, '');

  let maskedValue = '';
  const length = onlyNumbers.length;

  for (let i = 0; i < length; i++) {
    if (i === length - 2) {
      maskedValue += ',';
    }
    maskedValue += onlyNumbers[i];
  }

  return maskedValue;
};
