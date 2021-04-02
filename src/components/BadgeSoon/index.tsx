import React, { FC } from 'react';

interface IBadgeSoon {
  text: string;
  color?: 'primary' | 'red' | 'yellow' | 'green' | 'turquoise' | 'blue' | 'white';
}

export const BadgeSoon: FC<IBadgeSoon> = ({
  text,
  color = 'primary',
}) => (
  <div className="badge-soon">
    <span className={`badge-soon__inner badge-soon__inner--${color}`}>
      {text}
    </span>
  </div>
);
