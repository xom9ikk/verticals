import slugify from '@sindresorhus/slugify';

const generateCharArray = (start: number, end: number) => [...new Array(end - start + 1)]
  .fill(0)
  .map((_, i) => String.fromCharCode(i + start));

const symbols = [...generateCharArray(48, 57), ...generateCharArray(97, 122)];
const size = symbols.length;

const intToString = (number: number) => {
  if (number < 1) throw new Error('Int must be greater than 0');
  let res = '';
  let n = number + 1;
  while (n > 1) {
    let index = Math.ceil((n - 1) % symbols.length);
    if (index >= size) index = 0;
    res = symbols[index] + res;
    n /= symbols.length;
  }
  return res;
};

const stringToInt = (string: string) => {
  const base = symbols.join('');
  const baseNumber = base.length;

  let runningTotal = 0;
  let characterIndex = 0;
  let indexExponent = string.length - 1;

  while (characterIndex < string.length) {
    const digit = string[characterIndex];
    const digitValue = base.indexOf(digit);
    runningTotal += baseNumber ** indexExponent * digitValue;

    characterIndex += 1;
    indexExponent -= 1;
  }
  return runningTotal;
};

export const useReadableId = () => {
  const toReadableId = (name: string, id: number) => `${slugify(name)}-${intToString(id)}`;

  const toNumericId = (readableId: string) => {
    const splitted = readableId.split('-');
    const stringedId = splitted[splitted.length - 1];
    return stringToInt(stringedId);
  };

  return {
    toReadableId,
    toNumericId,
  };
};
