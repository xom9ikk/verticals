/* eslint-disable no-param-reassign,no-caller,no-restricted-properties */
export const useCollapse = () => {
  const collapse = (element: HTMLElement, delay: number) => {
    const sectionHeight = element.scrollHeight;
    element.style.transition = '';

    requestAnimationFrame(() => {
      element.style.height = `${sectionHeight}px`;
      element.style.transition = `height ${delay}ms ease-in-out`;

      requestAnimationFrame(() => {
        element.style.height = `${0}px`;
      });
    });
  };

  const expand = (element: HTMLElement, delay: number) => {
    const sectionHeight = element.scrollHeight;

    element.style.height = `${sectionHeight}px`;

    setTimeout(() => {
      element.style.height = 'auto';
    }, delay);
  };

  return {
    collapse,
    expand,
  };
};
