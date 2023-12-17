export const MaskValor = (value) => {
  const onlyNumbers = value.replace(/[^\d]/g, '');

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
