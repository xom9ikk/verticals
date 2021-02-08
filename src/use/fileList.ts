import { useAlert } from '@/use/alert';
import { useFormat } from '@/use/format';

export const useFileList = () => {
  const { show, ALERT_TYPES } = useAlert();
  const { formatSize } = useFormat();

  const merge = (...args: Array<FileList | null>): FileList | null => {
    const dataTransfer = new DataTransfer();

    args.forEach((fileList) => {
      if (fileList !== null) {
        for (let i = 0; i < fileList.length; i += 1) {
          dataTransfer.items.add(fileList[i]);
        }
      }
    });

    return dataTransfer.files;
  };

  const filter = (
    fileList: FileList | null,
    predicate: (file: File, index: number) => boolean,
  ): FileList | null => {
    const dataTransfer = new DataTransfer();

    if (fileList !== null) {
      for (let i = 0; i < fileList.length; i += 1) {
        if (predicate(fileList[i], i)) {
          dataTransfer.items.add(fileList[i]);
        }
      }
    }

    return dataTransfer.files;
  };

  const restrictFileSize = (
    fileList: FileList | null, maxBytes: number,
  ): FileList | null => filter(fileList, (file) => {
    if (file.size < maxBytes) {
      return true;
    }
    show(
      'Attachments',
      `File ${file.name} exceeds the maximum allowed size ${formatSize(maxBytes)}`,
      ALERT_TYPES.DANGER,
    );
    return false;
  });

  return {
    merge,
    filter,
    restrictFileSize,
  };
};
