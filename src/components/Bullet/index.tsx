/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  FC,
} from 'react';
import { Checkbox } from '@comp/Checkbox';
import { EnumTodoStatus, EnumTodoType } from '@/types';

const bullets = ['arrow', 'dot', 'dash'];

interface IBullet {
  type: EnumTodoType;
  status: EnumTodoStatus;
  onChangeStatus: ()=>void;
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
              status === EnumTodoStatus.Doing && (
              <div className="card__overlay-doing" />
              )
            }
            <Checkbox
              isActive={status === EnumTodoStatus.Done}
              onClick={onChangeStatus}
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
