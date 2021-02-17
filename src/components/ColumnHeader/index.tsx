import React, {
  FC, useMemo, useRef, useState,
} from 'react';
import cn from 'classnames';
import { useColorClass } from '@use/colorClass';
import { DraggableProvided } from 'react-beautiful-dnd';
import { EnumColumnMode } from '@comp/Column';
import { TextArea } from '@comp/TextArea';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import { IColor } from '@type/entities';
import { ColumnsActions, SystemActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import { useFocus } from '@use/focus';
import { useNewValues } from '@use/newValues';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import useKeys from '@rooks/use-keys';

interface IColumnHeader {
  provided: DraggableProvided;
  boardId: number;
  columnId: number;
  belowId?: number;
  title?: string;
  description?: string;
  color?: IColor;
  isEditable: boolean;
  mode: EnumColumnMode;
  onHover: (isHovered: boolean) => void;
  onClick: (e: React.SyntheticEvent) => void;
  onDoubleClick: (e: React.SyntheticEvent) => void;
  scrollToRight?: () => void;
}

export const ColumnHeader: FC<IColumnHeader> = ({
  provided,
  boardId,
  columnId,
  belowId,
  title = '',
  description = '',
  color,
  isEditable,
  mode,
  onHover,
  onClick,
  onDoubleClick,
  scrollToRight,
}) => {
  const dispatch = useDispatch();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const { isNewValues } = useNewValues();
  const colorClass = useColorClass('column__inner', color);

  const [titleValue, setTitleValue] = useState<string>(title);
  const [descriptionValue, setDescriptionValue] = useState<string>(description);

  const titleInputRef = useRef<any>(null);

  useFocus(titleInputRef, [isEditable]);

  const saveColumnHeader = () => {
    if (!isEditable) return;
    const normalizedTitleValue = titleValue.trim();
    const normalizedDescriptionValue = descriptionValue?.trim();

    if (mode === EnumColumnMode.Normal && belowId === undefined) {
      const isNew = isNewValues([title, normalizedTitleValue], [description, normalizedDescriptionValue]);
      if (normalizedTitleValue && isNew) {
        dispatch(ColumnsActions.update({
          id: columnId,
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
        }));
      } else {
        setTitleValue(title);
        setDescriptionValue(description);
      }
      dispatch(SystemActions.setEditableColumnId(null));
    }
    if (mode === EnumColumnMode.New || belowId !== undefined) {
      if (normalizedTitleValue) {
        dispatch(ColumnsActions.create({
          title: normalizedTitleValue,
          description: normalizedDescriptionValue || undefined,
          boardId,
          belowId,
        }));
      } else {
        dispatch(SystemActions.setEditableColumnId(null));
      }
      if (belowId !== undefined) {
        dispatch(SystemActions.setEditableColumnId(null));
      } else {
        setTitleValue('');
        setDescriptionValue('');
        setTimeout(() => {
          scrollToRight?.();
        }, 200);
      }
    }
  };

  const handleEsc = () => {
    dispatch(SystemActions.setEditableColumnId(null));
    saveColumnHeader();
  };

  const [headerRef] = useOutsideClickRef(saveColumnHeader, isEditable);

  useKeys(['Escape'], handleEsc, {
    // @ts-ignore
    target: headerRef,
    when: isEditable,
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key, ctrlKey, shiftKey } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      saveColumnHeader();
    }
  };

  const handleChange = (event: any, isDescription: boolean) => {
    const { value } = event.target;
    return isDescription
      ? setDescriptionValue(value)
      : setTitleValue(value);
  };

  const memoTitle = useMemo(() => (
    (mode !== EnumColumnMode.New || isEditable) && (
      <div className="column__header-container">
        {
          isEditable ? (
            <TextArea
              ref={titleInputRef}
              className="column__title column__title--editable"
              value={titleValue}
              placeholder="New column"
              minRows={1}
              maxRows={4}
              onKeyDown={shiftEnterRestriction}
              onKeyDownCapture={(event) => handleKeyDown(event)}
              onChange={(event) => handleChange(event, false)}
            />
          ) : (
            <span className={cn('column__title', { 'column__title--empty': !titleValue })}>
              {titleValue || 'New column'}
            </span>
          )
        }
      </div>
    )
  ), [mode, isEditable, titleValue]);

  const memoDescription = useMemo(() => (mode !== EnumColumnMode.New || isEditable) && (
    isEditable ? (
      <TextArea
        className="column__description column__description--editable"
        value={descriptionValue}
        placeholder="Notes"
        minRows={1}
        maxRows={4}
        onKeyDown={shiftEnterRestriction}
        onKeyDownCapture={(event) => handleKeyDown(event)}
        onChange={(event) => handleChange(event, true)}
      />
    ) : (
      <span
        className={cn('column__description', {
          'column__description--empty': !descriptionValue,
        })}
      >
        {descriptionValue || 'Notes'}
      </span>
    )
  ),
  [isEditable, descriptionValue]);

  return (
    <div
      ref={headerRef}
      role="button"
      tabIndex={0}
      className={cn('column__header', colorClass, {
        'column__header--editable': isEditable,
      })}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      {...provided.dragHandleProps}
    >
      { memoTitle }
      { memoDescription }
    </div>
  );
};
