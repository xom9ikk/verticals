import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// @ts-ignore TODO
const Div = ({ children }) => <div>{children({ innerRef: () => {} }, {})}</div>;
interface IDraggableComponent {
  index: number;
  draggableId: string;
  isDragDisabled: boolean;
  children: (p: DraggableProvided, s: DraggableStateSnapshot) => any
}

const DraggableComponent: FC<IDraggableComponent> = ({
  index,
  draggableId,
  isDragDisabled,
  children,
}) => (
  <Draggable
    index={index}
    draggableId={draggableId}
    isDragDisabled={isDragDisabled}
  >
    {children}
  </Draggable>
);

interface IDraggableComponent {
  isDragDisabled: boolean;
}

export const DraggableOrDiv: FC<IDraggableComponent> = React.memo(({
  isDragDisabled,
  children,
  ...rest
}) => (
  <>
    {isDragDisabled
      ? <Div>{children}</Div>
      : (
        <DraggableComponent
          isDragDisabled={isDragDisabled}
          {...rest}
        >
          {children}
        </DraggableComponent>
      )}
  </>
));
