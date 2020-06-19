/* eslint-disable @typescript-eslint/no-use-before-define,no-underscore-dangle */
import React, {
  FC, useMemo, useState,
} from 'react';
import {
  DragDropContext, DraggableLocation, Droppable, DroppableProvided, DropResult,
} from 'react-beautiful-dnd';
import { Column } from '../Column';

// type Column = { id: string; title: string,
// description: string, todos: Array<any>, index: number };

type Quote = {
  id: string;
  title: string;
  isDone: boolean;
};

interface QuoteMap {
  [key: string]: {
    todos: Quote[],
    title: string,
    description: string,
  },
}

interface IColumn {
  initialColumns: QuoteMap
}

type ReorderQuoteMapArgs = {
  quoteMap: QuoteMap,
  source: DraggableLocation,
  destination: DraggableLocation,
};

export const Columns: FC<IColumn> = ({ initialColumns }) => {
  const [columns, setColumns] = useState<QuoteMap>(initialColumns);
  const [orderedId, setOrderedId] = useState<Array<string>>(Object.keys(initialColumns));

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow: string[] = [...orderedId];
        shallow.splice(result.source.index, 1);
        setOrderedId(shallow);
        return;
      }

      // @ts-ignore
      const column: Quote[] = columns[result.source.droppableId];
      const withQuoteRemoved: Quote[] = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      // @ts-ignore
      const _columns: QuoteMap = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns(_columns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const { source } = result;
    const { destination } = result;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId
        && source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const _orderedId: string[] = reorder(
        orderedId,
        source.index,
        destination.index,
      );
      setOrderedId(_orderedId);
      return;
    }
    // console.log('before', columns);
    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });
    // console.log('after', data);
    setColumns(data);
  };

  const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const reorderQuoteMap = ({
    quoteMap,
    source,
    destination,
  }: ReorderQuoteMapArgs): QuoteMap => {
    const currentDescription: string = quoteMap[source.droppableId].description;
    const currentTitle: string = quoteMap[source.droppableId].title;
    const current: Quote[] = [...quoteMap[source.droppableId].todos];

    const nextTitle: string = quoteMap[destination.droppableId].title;
    const nextDescription: string = quoteMap[destination.droppableId].description;
    const next: Quote[] = [...quoteMap[destination.droppableId].todos];

    const target: Quote = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
      const reordered = {
        title: currentTitle,
        description: currentTitle,
        todos: reorder(current, source.index, destination.index),
      };
      return {
        ...quoteMap,
        [source.droppableId]: reordered,
      };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    console.log('source.droppableId', source.droppableId);
    console.log('destination.droppableId', destination.droppableId);
    console.log('source.index', source.index);
    console.log('target', target);
    console.log('current', current);
    console.log('next', next);
    return {
      ...quoteMap,
      [source.droppableId]: {
        todos: current,
        description: currentDescription,
        title: currentTitle,
      },
      [destination.droppableId]: {
        todos: next,
        description: nextDescription,
        title: nextTitle,
      },
    };
  };

  const drawColumns = useMemo(() => (
    orderedId && orderedId.map((key, index) => (
      <Column
        index={index}
        columnId={key}
        key={key}
        title={columns[key].title}
        todos={columns[key].todos}
        description={columns[key].description}
      />
    ))
  ), [columns, orderedId]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        // ignoreContainerClipping={false}
        // isCombineEnabled={false}
      >
        {(provided: DroppableProvided) => (
          <div
            className="columns"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            { drawColumns }
            {/* <Column */}
            {/*  key="new" */}
            {/*  title="" */}
            {/*  description="" */}
            {/*  todos={[]} */}
            {/* /> */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
