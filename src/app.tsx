import React, { FC, Suspense, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';

import 'swiper/swiper.scss';
import 'react-notifications-component/dist/theme.css';
import './styles/scss/main.scss';

import { MainRouter } from '@/router';
import { SystemActions } from '@store/actions';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SystemActions.effect.fetchLanguage());
  }, []);

  return (
    <Suspense fallback={<></>}>
      {createPortal(
        <ReactNotification />,
        document.getElementById('notification-root')!,
      )}
      <MainRouter />
      <ReactTooltip
        id="tooltip"
        place="top"
        effect="solid"
        multiline
        arrowColor="transparent"
        // overridePosition={({ left, top }) => ({ left, top })}
      />
    </Suspense>
  );
};
