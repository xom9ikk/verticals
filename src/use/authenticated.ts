import { storage } from '@plugins/storage';
import { useStorageSubscribed } from '@use/storageSubscriber';

export const useAuthenticated = () => {
  const token = useStorageSubscribed<string>(storage.getToken);

  return {
    isAuthenticated: !!token,
  };
};
