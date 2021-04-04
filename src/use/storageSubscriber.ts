import { storage } from '@plugins/storage';
import { useEffect, useState } from 'react';

export const useStorageSubscribed = <T>(selector: () => T) => {
  const [value, setValue] = useState<T>(selector());

  useEffect(() => {
    const handleUpdate = () => {
      setValue(selector());
    };

    storage.subscribe(handleUpdate);

    return () => {
      storage.unsubscribe(handleUpdate);
    };
  }, []);

  return value;
};