// @ts-ignore
import { store } from 'react-notifications-component';

const defaultPreferences = {
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

const ALERT_TYPES = {
  SUCCESS: 'success',
  DANGER: 'danger',
  INFO: 'info',
  DEFAULT: 'default',
  WARNING: 'warning',
};

export const useAlert = () => {
  const show = (
    title: string,
    message: string,
    type: string = ALERT_TYPES.DEFAULT,
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
