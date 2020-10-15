/* eslint-disable jsx-a11y/no-static-element-interactions,no-nested-ternary */
import React, {
  FC,
} from 'react';
import { Checkbox } from '@comp/Checkbox';
import { EnumTodoStatus, EnumTodoType } from '@/types/entities';

const bullets = ['arrow', 'dot', 'dash'];

interface IBullet {
  type: EnumTodoType;
  status: EnumTodoStatus;
  onChangeStatus: (event: any) => void;
}

export const Bullet: FC<IBullet> = ({
  type,
  status,
  onChangeStatus,
}) => {
  const renderBullet = () => {
    switch (type) {
      case EnumTodoType.Checkboxes:
        return (
          <>
            {
              status === EnumTodoStatus.Doing ? (
                <div className="card__overlay-doing" />
              ) : status === EnumTodoStatus.Canceled ? (
                <div className="card__overlay-canceled" />
              ) : null
            }
            <Checkbox
              isActive={status === EnumTodoStatus.Done}
              onChange={onChangeStatus}
              style={{ marginTop: 10, marginBottom: 10 }}
            />
          </>
        );
      case EnumTodoType.Arrows:
      case EnumTodoType.Dots:
      case EnumTodoType.Dashes:
        return (
          <img
            className="card__bullet"
            src={`/assets/svg/card/${bullets[type - 1]}.svg`}
            alt="bullet"
          />
        );
      case EnumTodoType.Nothing:
        return (
          <></>
        );
      default: return (
        <></>
      );
    }
  };

  return renderBullet();
};
