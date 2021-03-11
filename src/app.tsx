import React, { FC, Suspense, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import ReactNotification from 'react-notifications-component';
import ReactTooltip from 'react-tooltip';

import 'swiper/swiper.scss';
import 'react-notifications-component/dist/theme.css';
import { Gallery } from '@comp/Gallery';
import { FormattingHelp } from '@comp/FormattingHelp';
import { MainRouter } from '@/router';
import './styles/scss/main.scss';
import { SystemActions, UpdatesActions } from '@store/actions';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SystemActions.effect.fetchLanguage());
    dispatch(UpdatesActions.effect.subscribe());
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
        overridePosition={({ left, top }) => ({ left, top })}
      />
      <Gallery />
      <FormattingHelp />
    </Suspense>
  );
};
