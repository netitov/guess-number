
export function declineWithNumerals(n, forms) {

  if (typeof n !== 'number') {
    return new Error('Первым аргументом должно быть число');
  }

  if (!Array.isArray(forms) || forms.length < 3) {
    return new Error('Вторым аргументом должно быть массив строк: [<слово в им.падеже>, <слово в род.падеже ед.числа>, <слово в род.падеже мн.числа>]');
  }
  const num = Math.abs(n) % 100;

  const lastDigit = Math.abs(n) % 10;

  if (num >= 11 && num <= 14) {
    return forms[2];
  }

  if (lastDigit === 1) {
    return forms[0];
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
  return forms[1];
  }

  return forms[2];
}

