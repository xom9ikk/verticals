import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

interface IDiv {
  children: any;
}

interface IDraggableComponent {
  index: number;
  draggableId: string;
  isDragDisabled: boolean;
  children: (p: DraggableProvided, s: DraggableStateSnapshot) => any
}

interface IDraggableComponent {
  isDragDisabled: boolean;
}

const Div: FC<IDiv> = ({ children }) => <div>{children({ innerRef: () => {} }, {})}</div>;

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
