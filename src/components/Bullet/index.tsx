/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import { Checkbox } from '@comp/Checkbox';
import { EnumTodoStatus, EnumCardType } from '@type/entities';

const bullets = ['arrow', 'dot', 'dash'];

interface IBullet {
  type: EnumCardType;
  status: EnumTodoStatus;
  onChangeStatus: (status: EnumTodoStatus) => void;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

export const Bullet: FC<IBullet> = ({
  type,
  status,
  onChangeStatus,
  size = 'small',
  style,
}) => {
  const handleChange = (event: React.KeyboardEvent) => {
    const { shiftKey, metaKey } = event.nativeEvent;
    let newStatus;
    if (shiftKey) {
      newStatus = EnumTodoStatus.Canceled;
    } else if (metaKey) {
      newStatus = EnumTodoStatus.Doing;
    } else if (status === EnumTodoStatus.Done) {
      newStatus = EnumTodoStatus.Todo;
    } else {
      newStatus = EnumTodoStatus.Done;
    }
    onChangeStatus(newStatus);
  };

  const renderBullet = () => {
    switch (type) {
      case EnumCardType.Checkboxes:
        return (
          <div
            className={`bullet__overlay bullet__overlay--${size}`}
            style={style}
          >
            {
              status === EnumTodoStatus.Doing ? (
                <div className="bullet__overlay--doing" />
              ) : status === EnumTodoStatus.Canceled ? (
                <div className="bullet__overlay--canceled" />
              ) : null
            }
            <Checkbox
              isActive={status === EnumTodoStatus.Done}
              onChange={handleChange}
              size={size}
            />
          </div>
        );
      case EnumCardType.Arrows:
      case EnumCardType.Dots:
      case EnumCardType.Dashes:
        return (
          <img
            className="bullet__image"
            src={`/assets/svg/card/${bullets[type - 1]}.svg`}
            alt="bullet"
          />
        );
      case EnumCardType.Nothing:
        return null;
      default: return null;
    }
  };

  return renderBullet();
};
