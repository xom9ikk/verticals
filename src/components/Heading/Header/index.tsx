import React, {
  BaseSyntheticEvent, FC, useMemo, useRef,
} from 'react';
import cn from 'classnames';
import { useColorClass } from '@use/colorClass';
import { DraggableProvided } from 'react-beautiful-dnd';
import { EnumHeadingMode } from '@comp/Heading';
import { TextArea } from '@comp/TextArea';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';
import { EnumHeadingType, IColor } from '@type/entities';
import { HeadingsActions, SystemActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import { useFocus } from '@use/focus';
import { useNewValues } from '@use/newValues';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import useKeys from '@rooks/use-keys';
import { useTranslation } from 'react-i18next';
import { useEffectState } from '@use/effectState';
import { Divider } from '@comp/Divider';

interface IHeadingHeader {
  provided: DraggableProvided;
  columnId: number;
  headingId: number;
  belowId?: number;
  title?: string;
  description?: string;
  color?: IColor;
  isEditable: boolean;
  mode: EnumHeadingMode;
  type: EnumHeadingType;
  onHover: (isHovered: boolean) => void;
  onClick: (e: React.SyntheticEvent) => void;
  onDoubleClick: (e: React.SyntheticEvent) => void;
}

export const HeadingHeader: FC<IHeadingHeader> = ({
  provided,
  columnId,
  headingId,
  title = '',
  description = '',
  color,
  isEditable,
  mode,
  type,
  onHover,
  onClick,
  onDoubleClick,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const { isNewValues } = useNewValues();
  const colorClass = useColorClass('heading__inner', color);
  const isArchived = type === EnumHeadingType.Archived;
  const isNewHeading = mode === EnumHeadingMode.New;

  const [titleValue, setTitleValue] = useEffectState<string>(title);
  const [descriptionValue, setDescriptionValue] = useEffectState<string>(description);

  const titleInputRef = useRef<any>(null);

  useFocus(titleInputRef, [isEditable]);

  const saveHeadingHeader = () => {
    if (!isEditable) return;
    const normalizedTitleValue = titleValue.trim();
    const normalizedDescriptionValue = descriptionValue?.trim();

    if (mode === EnumHeadingMode.Normal) { // && belowId === undefined
      const isNew = isNewValues([title, normalizedTitleValue], [description, normalizedDescriptionValue]);
      if (normalizedTitleValue && isNew) {
        dispatch(HeadingsActions.effect.update({
          id: headingId,
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
        }));
      } else {
        setTitleValue(title);
        setDescriptionValue(description);
      }
    }
    if (mode === EnumHeadingMode.New) { // || belowId !== undefined
      if (normalizedTitleValue) {
        dispatch(HeadingsActions.effect.create({
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
          columnId,
        }));
      }
      // else {
      //   dispatch(SystemActions.setEditableHeadingId(null));
      // }
      // if (belowId !== undefined) {
      // dispatch(SystemActions.setEditableHeadingId(null));
      // } else {
      setTitleValue('');
      setDescriptionValue('');
    }
    dispatch(SystemActions.setEditableHeadingId(null));
  };

  const handleEsc = () => {
    // dispatch(SystemActions.setEditableHeadingId(null));
    saveHeadingHeader();
  };

  const [headerRef] = useOutsideClickRef(saveHeadingHeader, isEditable);

  useKeys(['Escape'], handleEsc, {
    // @ts-ignore
    target: headerRef,
    when: isEditable,
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key, ctrlKey, shiftKey } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      saveHeadingHeader();
    }
  };

  const handleChange = (event: BaseSyntheticEvent) => {
    const { value, name } = event.target;
    switch (name) {
      case 'title': setTitleValue(value); break;
      case 'description': setDescriptionValue(value); break;
      default: break;
    }
  };

  const memoTitle = useMemo(() => (
    (!isNewHeading || isEditable) && (
      <div className="heading__header-container">
        {
          isEditable ? (
            <TextArea
              ref={titleInputRef}
              className="heading__title heading__title--editable"
              value={titleValue}
              name="title"
              placeholder={t('New heading')}
              minRows={1}
              maxRows={2}
              onKeyDown={shiftEnterRestriction}
              onKeyDownCapture={handleKeyDown}
              onChange={handleChange}
            />
          ) : (
            <span className={cn('heading__title', {
              'heading__title--empty': !titleValue,
              'heading__title--archived': isArchived,
            })}
            >
              {titleValue || t('New heading')}
            </span>
          )
        }
      </div>
    )
  ), [t, isNewHeading, isEditable, titleValue, isArchived]);

  const memoDescription = useMemo(() => (!isNewHeading || isEditable) && (
    isEditable ? (
      <TextArea
        className="heading__description heading__description--editable"
        value={descriptionValue}
        name="description"
        placeholder={t('Notes')}
        minRows={1}
        maxRows={2}
        onKeyDown={shiftEnterRestriction}
        onKeyDownCapture={handleKeyDown}
        onChange={handleChange}
      />
    ) : (
      descriptionValue && (
      <span
        className={cn('heading__description', {
          'heading__description--empty': !descriptionValue,
        })}
      >
        {descriptionValue || t('Notes')}
      </span>
      )
    )
  ),
  [t, isNewHeading, isEditable, descriptionValue, t]);

  return (
    <div
      ref={headerRef}
      role="button"
      tabIndex={0}
      className={cn('heading__header', colorClass, {
        'heading__header--editable': isEditable,
        'heading__header--new': isNewHeading,
      })}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      {...provided.dragHandleProps}
    >
      { memoTitle }
      { !isArchived && memoDescription }
      { !isNewHeading && (
        <Divider
          style={{ marginTop: 0, marginBottom: 10 }}
        />
      )}
    </div>
  );
};
