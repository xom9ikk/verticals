export const useCustomHook = () => {
  const custom = () => {
    return 'custom hook';
  };
  return {
    custom,
  };
};
