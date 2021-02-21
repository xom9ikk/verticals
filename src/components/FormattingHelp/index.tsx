import React, { FC, useMemo } from 'react';
import { SystemActions } from '@store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getIsOpenFormattingHelp } from '@store/selectors';
import { ControlButton } from '@comp/ControlButton';
import { useMarkdown } from '@use/markdown';
import { useTranslation } from 'react-i18next';

const strings = [
  '# Header 1 8-)',
  '## Header 2',
  '### Header 3',
  `- List item<br>
  - Item 2<br>
  - Item 3`,
  `1. Ordered list item<br>
  2. Item 2<br>
  3. Item 3`,
  '**Bold text**',
  '*Italic text*',
  '~~Strikethrough~~',
  '[Link title](http://)',
  `## Blockquotes
<br>
<br>
> Blockquotes can also be nested...<br>
>> ...by using additional greater-than signs right next to each other...<br>
> > > ...or with spaces between arrows.`,
  '(c) (C) (r) (R) (tm) (TM) (p) (P) +-',
  '-----',
  '`inline code`',
  `\`\`\`ts<br>
const app = 'verticals'; // Your feedback is always welcome!<br>
<br>
type IMultiplication = (x: number, y: number) => number;

const multiplication: IMultiplication = (x, y) => x * y;<br>
<br>
console.log('What is 737 * 894, mm?');<br>
<br>
const result = multiplication(737, 894);<br>  
<br>
console.log('Okay. Let me multiply it for you', result); // 658878<br>
<br>
const places = ['Domino\`s Pizza', 'Mafia', 'KFC', 'McDonald\`s', 'Евразия'];<br>
const placeForEatToday = places[Math.floor(Math.random() * Math.floor(places.length))];<br>
console.log(\`Today you will eat at $\{placeForEatToday}, ofc\`); // Today you will eat at Domino\`s Pizza<br>

\`\`\``,
  `## Tables<br>
<br>
| Option | Description |<br>
| ------ | ----------- |<br>
| data   | path to data files to supply the data that will be passed into templates. |<br>
| engine | engine to be used for processing templates. Handlebars is the default. |<br>
| ext    | extension to be used for dest files. |`,
];

export const FormattingHelp: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { renderMarkdown } = useMarkdown();
  const isOpenFormattingHelp = useSelector(getIsOpenFormattingHelp);

  const handleClose = () => {
    dispatch(SystemActions.setIsOpenFormattingHelp(false));
  };

  const formattingHelp = useMemo(() => isOpenFormattingHelp && (
  <div className="formatting-help__popup">
    <ControlButton
      imageSrc="/assets/svg/close.svg"
      alt="close"
      imageSize={16}
      size={32}
      style={{
        position: 'absolute',
        right: 0,
        top: 10,
      }}
      onClick={handleClose}
    />
    <h1 className="formatting-help__title">{t('Text formatting help')}</h1>
    <h4 className="formatting-help__subtitle">
      {t('App supports markdown for text formatting in the comments. Try some examples below.')}
    </h4>
    <div className="formatting-help__content">
      <div className="formatting-help__original">
        {
        strings.map((string) => (
          <div dangerouslySetInnerHTML={{ __html: string }} />
        ))
      }
      </div>
      <div
        className="formatting-help__result markdown"
        dangerouslySetInnerHTML={{
          __html: renderMarkdown(strings
            .map((string) => string.replace(/<br>/g, '')).join('\n\n')),
        }}
      />
    </div>
  </div>
  ), [isOpenFormattingHelp]);

  return (
    <div className="formatting-help">
      {formattingHelp}
    </div>
  );
};
