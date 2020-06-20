export const useFocus = () => {
  const focus = (ref: any) => {
    if (!ref.current) return;
    ref.current.focus();
    ref.current.setSelectionRange(ref.current.value.length, ref.current.value.length);
  };

  return {
    focus,
  };
};
