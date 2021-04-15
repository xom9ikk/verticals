import { useFormData } from '@use/formData';

const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE);

type IUseOpenFiles = () => {
  openFiles: (
    accept: string,
    isMultiple?: boolean
  ) => Promise<FormData>
};

export const useOpenFiles: IUseOpenFiles = () => {
  const { restrictFileSize } = useFormData();

  const dispatchClick = (element: HTMLElement) => {
    const eventMouse = document.createEvent('MouseEvents');
    eventMouse.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    element.dispatchEvent(eventMouse);
  };

  const openFiles = (
    accept = '',
    isMultiple = true,
  ) => new Promise<FormData>((resolve) => {
    const root = document.querySelector('#root')!;
    const fileInput = document.createElement('input');
    fileInput.multiple = isMultiple;
    fileInput.accept = accept;
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.onchange = (event: Event) => {
      const { files } = event.target as HTMLInputElement;
      root.removeChild(fileInput);
      const formData = restrictFileSize(files, MAX_FILE_SIZE);
      return resolve(formData);
    };

    root.appendChild(fileInput);
    dispatchClick(fileInput);
  });

  return {
    openFiles,
  };
};
