import React, {
  FC,
} from 'react';
import { TodoCardPopup } from '@comp/CardPopup/Todo';
import { SubTodoCardPopup } from '@comp/CardPopup/SubTodo';
import { EnumCardType } from '@type/entities';

interface ICardPopupWrapper {
  columnId: number;
  cardType: EnumCardType;
}

export const CardPopupWrapper: FC<ICardPopupWrapper> = (
  props,
) => (
  <>
    <TodoCardPopup {...props} />
    <SubTodoCardPopup {...props} />
  </>
);
