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
      case EnumTodoType.Checkboxes:
        return (
          <div
            className={`
          bullet__overlay 
          bullet__overlay--${size}`}
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
      case EnumTodoType.Arrows:
      case EnumTodoType.Dots:
      case EnumTodoType.Dashes:
        return (
          <img
            className="bullet__image"
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
