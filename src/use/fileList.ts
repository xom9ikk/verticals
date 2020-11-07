export const useFileList = () => {
  const merge = (...args: Array<FileList | null>) => {
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

  const filter = (fileList: FileList | null, predicate: (file: File, index: number) => boolean) => {
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

  return {
    merge,
    filter,
  };
};
