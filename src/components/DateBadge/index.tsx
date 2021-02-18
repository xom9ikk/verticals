import React, { FC } from 'react';
import cn from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import isFuture from 'date-fns/isFuture';
import isThisYear from 'date-fns/isThisYear';
import isTomorrow from 'date-fns/isTomorrow';

interface IDateBadge {
  date?: Date;
}

export const DateBadge: FC<IDateBadge> = ({
  date,
}) => {
  const today = isToday(date);
  const tomorrow = isTomorrow(date);
  const past = !isFuture(date) && !isToday(date);

  const img = today ? 'star' : 'calendar-2';

  const formattedYear = isThisYear(date) ? '' : `'${format(date, 'yy')}`;
  const formattedDate = `${format(date, 'LLL dd')}${formattedYear}`;

  return (date ? (
    <div className={cn('date-badge', {
      'date-badge--yellow': today,
      'date-badge--red': past,
    })}
    >
      <img src={`/assets/svg/board/${img}.svg`} alt="badge" />
      {today && <span>Today</span>}
      {tomorrow && <span>Tomorrow</span>}
      {!today && !tomorrow && <span>{formattedDate}</span>}
    </div>
  ) : null);
};
