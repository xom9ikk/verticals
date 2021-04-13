import { ReactNotificationOptions, store } from 'react-notifications-component';

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

const show = (
  title: string,
  message: string | Error,
  type: IType = ALERT_TYPES.DEFAULT,
  preferences = defaultPreferences,
) => {
  store.addNotification({
    title,
    message: message instanceof Error ? message.message : message,
    type,
    ...preferences,
  });
};

export const useAlert = () => ({
  show,
  ALERT_TYPES,
});
