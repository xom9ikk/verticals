import slugify from '@sindresorhus/slugify';

export const useReadableId = () => {
  const toReadableId = (name: string, id: number) => `${slugify(name)}-${id.toString(36)}`;

  const toNumericId = (readableId: string) => {
    const splitted = readableId.split('-');
    const stringedId = splitted[splitted.length - 1];
    return parseInt(stringedId, 36);
  };

  return {
    toReadableId,
    toNumericId,
  };
};
