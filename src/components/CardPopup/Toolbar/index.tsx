import React, { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ControlButton } from '@comp/ControlButton';
import { DatePickerPopup } from '@comp/DatePicker/Popup';

interface ICardPopupToolbar {
  cardId: number;
  isNotificationsEnabled: boolean;
  expirationDate: Date | null;
  onSwitchNotifications: () => void;
  onSelectDate: (date: Date | null) => void;
}

export const CardPopupToolbar: FC<ICardPopupToolbar> = ({
  isNotificationsEnabled,
  expirationDate,
  cardId,
  onSwitchNotifications,
  onSelectDate,
  children,
}) => {
  const { t } = useTranslation();

  const buttonRef = useRef<any>(null);

  return (
    <>
      <div className="card-popup-toolbar">
        <div className="card-popup-toolbar__inner">
          <ControlButton
            ref={buttonRef}
            imageSrc="/assets/svg/calendar.svg"
            tooltip={t('Date')}
            alt="date"
            imageSize={24}
            size={36}
            isColored
          />
          <DatePickerPopup
            popupId={`card-popup-${cardId}`}
            sourceRef={buttonRef}
            onSelectDate={onSelectDate}
            selectedDate={expirationDate}
          />
          {children}
        </div>
        <ControlButton
          imageSrc={`/assets/svg/bell${isNotificationsEnabled ? '-active' : ''}.svg`}
          tooltip={`${isNotificationsEnabled
            ? t('Turn off')
            : t('Turn on')} ${t('card notifications')}`}
          alt="notification"
          imageSize={24}
          size={36}
          isColored
          style={{
            justifySelf: 'flex-end',
          }}
          onClick={onSwitchNotifications}
        />
      </div>
      <hr />
    </>
  );
};
