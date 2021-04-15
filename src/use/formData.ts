/* eslint-disable no-restricted-syntax */
import i18n from '@/i18n';
import { useAlert } from '@use/alert';
import { useFormat } from '@use/format';

export const useFormData = () => {
  const { show, ALERT_TYPES } = useAlert();
  const { formatSize } = useFormat();

  const merge = (...args: Array<FormData>): FormData => {
    const result = new FormData();
    args.forEach((formData) => {
      for (const [key, value] of formData.entries()) {
        result.append(key, value);
      }
    });
    return result;
  };

  const filter = (
    formData: FormData,
    predicate: (file: File | string, index: number) => boolean,
  ): FormData => {
    const result = new FormData();

    if (!formData.entries().next().done) {
      let index = 0;
      for (const [key, value] of formData.entries()) {
        if (predicate(value, index)) {
          result.append(key, value);
        }
        index += 1;
      }
    }

    return result;
  };

  const restrictFileSize = (
    fileList: FileList | null, maxBytes: number,
  ): FormData => {
    const formData = new FormData();
    if (!fileList) {
      return formData;
    }
    for (let i = 0; i < fileList.length; i += 1) {
      const file = fileList[i];
      if (file.size < maxBytes) {
        formData.append(file.name, file);
      } else {
        show(
          i18n.t('Attachments'),
          `${i18n.t('File')} ${file.name} ${i18n.t('exceeds the maximum allowed size')} ${formatSize(maxBytes)}`,
          ALERT_TYPES.DANGER,
        );
      }
    }
    return formData;
  };

  return {
    merge,
    filter,
    restrictFileSize,
  };
};
