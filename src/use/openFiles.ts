type IUseOpenFiles = () => {
  openFiles: (
    accept: string,
    isMultiple?: boolean
  ) => Promise<FileList | null>
};

export const useOpenFiles: IUseOpenFiles = () => {
  const dispatchClick = (element: HTMLElement) => {
    const eventMouse = document.createEvent('MouseEvents');
    eventMouse.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(eventMouse);
  };

  const openFiles = (
    accept = '',
    isMultiple = true,
  ) => new Promise<FileList | null>((resolve) => {
    const root = document.querySelector('#root')!;
    const fileInput = document.createElement('input');
    fileInput.multiple = isMultiple;
    fileInput.accept = accept;
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      root.removeChild(fileInput);
      return resolve(files);
    };

    root.appendChild(fileInput);
    dispatchClick(fileInput);
  });

  return {
    openFiles,
  };
};
