export const useNewValues = () => {
  const isNewValues = (...args: Array<[any, any]>) => args.some((pair) => {
    let [first, second] = pair;
    if (first === null) first = undefined;
    if (second === null) second = undefined;
    return first !== second;
  });
  return {
    isNewValues,
  };
};
