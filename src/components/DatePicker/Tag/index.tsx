import format from 'date-fns/format';
import React, { FC } from 'react';

import { ControlButton } from '@comp/ControlButton';

interface IDatePickerTag {
  date: Date;
  onRemove: () => void;
}

export const DatePickerTag: FC<IDatePickerTag> = ({
  date,
  onRemove,
}) => (
  <div className="datepicker-tag__wrapper">
    <div className="datepicker-tag">
      {format(date, 'LLLL dd, yyyy')}
      <ControlButton
        imageSrc="/assets/svg/close.svg"
        alt="close"
        imageSize={8}
        size={16}
        isInvertColor
        style={{
          padding: 6,
          borderRadius: 4,
          marginLeft: 5,
        }}
        onClick={onRemove}
      />
    </div>
  </div>
);
