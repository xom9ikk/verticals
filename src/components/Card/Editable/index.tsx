import useKeys from '@rooks/use-keys';
import useOutsideClickRef from '@rooks/use-outside-click-ref';
import React, {
  BaseSyntheticEvent,
  Dispatch, FC, SetStateAction, useEffect, useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { CommentFormAttachments } from '@comp/Comments/Form/Attachments';
import { ControlButton } from '@comp/ControlButton';
import { DateBadge } from '@comp/DateBadge';
import { DatePickerPopup } from '@comp/DatePicker/Popup';
import { TextArea } from '@comp/TextArea';
import { SubTodosActions, SystemActions, TodosActions } from '@store/actions';
import { useEffectState } from '@use/effectState';
import { useFileList } from '@use/fileList';
import { useFocus } from '@use/focus';
import { useNewValues } from '@use/newValues';
import { useNormalizeDate } from '@use/normalizeDate';
import { useOpenFiles } from '@use/openFiles';
import { EnumScrollPosition, useScrollToRef } from '@use/scrollToRef';
import { useShiftEnterRestriction } from '@use/shiftEnterRestriction';

export interface IUpdateCardEntity {
  title: string;
  description: string;
  expirationDate: Date | null;
}

export type ICreateCardEntity = IUpdateCardEntity & {
  files: IFiles;
};

type IFiles = FileList | null;

interface ICard {
  belowId?: number;
  title: string;
  description: string;
  expirationDate?: Date | null;
  isNewCard: boolean;
  datePopupId: string;
  files: IFiles;
  onSetFiles: Dispatch<SetStateAction<IFiles>>;
  onSaveFiles: (files: IFiles) => void;
  onUpdateEntity: (data: IUpdateCardEntity) => void;
  onCreateEntity: (data: ICreateCardEntity) => void;
}

export const CardEditable: FC<ICard> = ({
  belowId,
  title,
  description,
  expirationDate,
  isNewCard,
  datePopupId,
  files,
  onSetFiles,
  onSaveFiles,
  onUpdateEntity,
  onCreateEntity,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { openFiles } = useOpenFiles();
  const { shiftEnterRestriction } = useShiftEnterRestriction();
  const { isNewValues } = useNewValues();
  const { normalizeDate } = useNormalizeDate();
  const { merge, filter } = useFileList();

  const [titleValue, setTitleValue] = useEffectState<string>(title);
  const [descriptionValue, setDescriptionValue] = useEffectState<string>(description);
  const [expirationDateValue, setExpirationDateValue] = useEffectState<Date | null>(expirationDate || null);

  const buttonRef = useRef<any>(null);
  const titleInputRef = useRef<any>(null);

  const { focus } = useFocus();

  useEffect(() => {
    focus(titleInputRef);
  }, []);

  const [scrollToRef, refForScroll] = useScrollToRef<HTMLDivElement>();

  const resetEditableCard = () => {
    dispatch(SystemActions.setEditableCardId(null));
    dispatch(SystemActions.setEditableSubCardId(null));
    dispatch(TodosActions.removeTemp());
    dispatch(SubTodosActions.removeTemp());
  };

  const saveEntity = () => {
    const normalizedTitleValue = titleValue.trim();
    const normalizedDescriptionValue = descriptionValue?.trim();

    const isTempCard = belowId !== undefined;
    const isCardNotForCreate = !isNewCard && !isTempCard;

    if (isCardNotForCreate) {
      const isNew = isNewValues(
        [title, normalizedTitleValue],
        [description, normalizedDescriptionValue],
        [expirationDate, expirationDateValue],
      );
      if (normalizedTitleValue && isNew) {
        onUpdateEntity({
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
          expirationDate: normalizeDate(expirationDateValue),
        });
      } else {
        setTitleValue(title);
        setDescriptionValue(description);
      }
      onSaveFiles(files);
      resetEditableCard();
    } else {
      if (normalizedTitleValue) {
        onCreateEntity({
          title: normalizedTitleValue,
          description: normalizedDescriptionValue,
          expirationDate: normalizeDate(expirationDateValue),
          files,
        });
      } else {
        resetEditableCard();
      }
      if (belowId !== undefined) {
        resetEditableCard();
      } else {
        setTitleValue('');
        setDescriptionValue('');
        setExpirationDateValue(null);
      }
    }
    // dispatch(TodosActions.removeTemp());
    onSetFiles(new DataTransfer().files);
  };

  const handleChange = (event: BaseSyntheticEvent) => {
    const { value, name } = event.target;
    switch (name) {
      case 'title': setTitleValue(value); break;
      case 'description': setDescriptionValue(value); break;
      default: break;
    }
  };

  const handleUploadFile = async () => {
    const openedFiles = await openFiles('*', true);
    onSetFiles((prev) => merge(prev, openedFiles));
  };

  const handleRemoveFile = (index: number) => {
    onSetFiles((prev) => filter(prev, (file, i) => i !== index));
  };

  const handleKeyDown = (event: any) => {
    const { key, ctrlKey, shiftKey } = event;
    if (key === 'Enter' && !ctrlKey && !shiftKey) {
      saveEntity();
    }
  };

  const handleEsc = () => {
    resetEditableCard();
    saveEntity();
  };

  const [todoRef] = useOutsideClickRef((e) => {
    if (e.isTrusted) {
      saveEntity();
    }
  });

  useKeys(['Escape'], handleEsc, {
    // @ts-ignore
    target: todoRef,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('scroll to on mount');
      scrollToRef({
        block: EnumScrollPosition.Center,
      });
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isNewCard) {
        console.log('scroll to new Card');
        scrollToRef({
          block: EnumScrollPosition.Center,
        });
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [titleValue, descriptionValue]);

  const handleSelectDate = (selectedDate: Date | null) => {
    dispatch(SystemActions.setActivePopupId(null));
    setExpirationDateValue(selectedDate);
  };

  return (
    <div
      className="card__editable-content"
      ref={(ref) => {
        todoRef(ref);
        refForScroll.current = ref;
      }}
    >
      <TextArea
        ref={titleInputRef}
        className="card__textarea"
        value={titleValue}
        name="title"
        placeholder={t('New Card')}
        minRows={1}
        maxRows={20}
        onKeyDown={shiftEnterRestriction}
        onKeyDownCapture={handleKeyDown}
        onChange={handleChange}
      />
      <TextArea
        className="card__textarea card__textarea--description"
        value={descriptionValue}
        name="description"
        placeholder={t('Notes')}
        minRows={1}
        maxRows={20}
        onKeyDown={shiftEnterRestriction}
        onKeyDownCapture={handleKeyDown}
        onChange={handleChange}
      />
      <div>
        {expirationDateValue && (
        <DateBadge
          popupId={datePopupId}
          position="bottom"
          date={expirationDateValue}
          onSelectDate={handleSelectDate}
        />
        )}
      </div>
      <CommentFormAttachments
        files={files}
        onRemove={handleRemoveFile}
        isListView
      />
      <div className="card__editable-container">
        <div className="card__editable-controls">
          <ControlButton
            ref={buttonRef}
            imageSrc="/assets/svg/calendar-dots.svg"
            tooltip={t('Add Date')}
            alt="date"
            imageSize={16}
            size={20}
            isColored
          />
          <DatePickerPopup
            popupId={datePopupId}
            sourceRef={buttonRef}
            onSelectDate={handleSelectDate}
            selectedDate={expirationDateValue}
          />
          <ControlButton
            imageSrc="/assets/svg/attach.svg"
            tooltip={t('Attach a file')}
            alt="file"
            imageSize={16}
            size={20}
            onClick={handleUploadFile}
            isColored
          />
        </div>
        <span>{t('Drop files here')}</span>
      </div>
    </div>
  );
};
