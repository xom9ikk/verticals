import downloadjs from 'downloadjs';

export const useDownload = () => {
  const download = (link: string) => downloadjs(link);

  return {
    download,
  };
};
