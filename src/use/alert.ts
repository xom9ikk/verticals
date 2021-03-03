import { store, ReactNotificationOptions } from 'react-notifications-component';

type IType = 'success' | 'danger' | 'info' | 'default' | 'warning';

interface IAlertTypes {
  [key: string]: IType;
}

const ALERT_TYPES: IAlertTypes = {
  SUCCESS: 'success',
  DANGER: 'danger',
  INFO: 'info',
  DEFAULT: 'default',
  WARNING: 'warning',
};

const defaultPreferences: ReactNotificationOptions = {
  insert: 'bottom',
  container: 'bottom-right',
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
  slidingExit: {
    duration: 500,
    timingFunction: 'ease-out',
    delay: 0,
  },
};

export const useAlert = () => {
  const show = (
    title: string,
    message: string,
    type: IType = ALERT_TYPES.DEFAULT,
    preferences = defaultPreferences,
  ) => {
    store.addNotification({
      title,
      message,
      type,
      ...preferences,
    });
  };

  return {
    show,
    ALERT_TYPES,
  };
};
