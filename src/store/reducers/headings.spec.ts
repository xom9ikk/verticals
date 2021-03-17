import { HeadingsActions } from '@store/actions';
import { EnumColors, EnumHeadingType } from '@type/entities';
import { HeadingsReducer, initialState } from '@store/reducers/headings';

const mockHeadings = [{
  id: 1,
  columnId: 11,
  title: 'Heading Title',
  description: 'Description for heading',
  type: EnumHeadingType.Custom,
  color: EnumColors.Green,
  isCollapsed: true,
}, {
  id: 2,
  columnId: 11,
  title: 'Heading Title #2',
  description: 'Description for heading #2',
  type: EnumHeadingType.Custom,
  color: EnumColors.Red,
  isCollapsed: true,
}, {
  id: 3,
  columnId: 11,
  title: 'Heading Title #3',
  description: 'Description for heading #3',
  type: EnumHeadingType.Custom,
  color: EnumColors.Gray,
  isCollapsed: true,
}, {
  id: 3,
  columnId: 22,
  title: 'Heading Title #4',
  description: 'Description for heading #4',
  type: EnumHeadingType.Custom,
  color: EnumColors.Turquoise,
  isCollapsed: true,
}, {
  id: 4,
  columnId: 22,
  title: 'Heading Title #5',
  description: 'Description for heading #5',
  type: EnumHeadingType.Custom,
  color: null,
  isCollapsed: true,
}];

describe('Heading reducer', () => {
  it('set all', () => {
    const [heading, heading2] = mockHeadings;
    expect(HeadingsReducer(initialState, HeadingsActions.setAll({
      entities: [heading, heading2],
      positions: {
        [heading.columnId]: [heading.id, heading2.id],
      },
    }))).toEqual({
      entities: [heading, heading2],
      positions: {
        [heading.columnId]: [heading.id, heading2.id],
      },
    });
  });
  it('set positions', () => {
    expect(HeadingsReducer(initialState, HeadingsActions.setPositionsByColumnId({
      columnId: 1,
      positions: [1, 2, 3, 4, 5, 6, 7],
    }))).toEqual({
      entities: [],
      positions: {
        1: [1, 2, 3, 4, 5, 6, 7],
      },
    });
  });
  it('update entity', () => {
    const [heading, heading2] = mockHeadings;
    const initialStateWithTwoHeadings = {
      entities: [heading, heading2],
      positions: {
        [heading.columnId]: [heading.id, heading2.id],
      },
    };
    expect(HeadingsReducer(initialStateWithTwoHeadings, HeadingsActions.updateEntity({
      id: 1,
      title: 'new Heading Title',
    }))).toEqual({
      entities: [{
        ...heading,
        title: 'new Heading Title',
      }, heading2],
      positions: {
        [heading.columnId]: [heading.id, heading2.id],
      },
    });
  });
  it('add heading', () => {
    const [heading] = mockHeadings;
    expect(HeadingsReducer(initialState, HeadingsActions.add(heading))).toEqual({
      entities: [heading],
      positions: {
        [heading.columnId]: [heading.id],
      },
    });
  });
  it('move', () => {
    const [heading, heading2, heading3, headingFromOtherColumn] = mockHeadings;
    const initialStateWithFourHeadings = {
      entities: [heading, heading2, heading3, headingFromOtherColumn],
      positions: {
        [heading.columnId]: [heading.id, heading2.id, heading3.id],
        [headingFromOtherColumn.columnId]: [headingFromOtherColumn.id],
      },
    };
    expect(HeadingsReducer(initialStateWithFourHeadings, HeadingsActions.move({
      columnId: heading.columnId,
      sourcePosition: 2,
      destinationPosition: 0,
    }))).toEqual({
      entities: [heading, heading2, heading3, headingFromOtherColumn],
      positions: {
        [heading.columnId]: [heading3.id, heading.id, heading2.id],
        [headingFromOtherColumn.columnId]: [headingFromOtherColumn.id],
      },
    });
  });
  it('move between columns', () => {
    const [heading, heading2, heading3, headingFromOtherColumn] = mockHeadings;
    const initialStateWithFourHeadings = {
      entities: [heading, heading2, heading3, headingFromOtherColumn],
      positions: {
        [heading.columnId]: [heading.id, heading2.id, heading3.id],
        [headingFromOtherColumn.columnId]: [headingFromOtherColumn.id],
      },
    };
    expect(HeadingsReducer(initialStateWithFourHeadings, HeadingsActions.move({
      columnId: headingFromOtherColumn.columnId,
      targetColumnId: heading.columnId,
      sourcePosition: 0,
      destinationPosition: 0,
    }))).toEqual({
      entities: [heading, heading2, heading3, headingFromOtherColumn],
      positions: {
        [heading.columnId]: [headingFromOtherColumn.id, heading.id, heading2.id, heading3.id],
        [headingFromOtherColumn.columnId]: [],
      },
    });
  });
  it('insert in position', () => {
    const [heading, heading2, heading3, headingFromOtherColumn, headingFromOtherColumn2] = mockHeadings;
    const initialStateWithFourHeadings = {
      entities: [heading, heading2, heading3, headingFromOtherColumn],
      positions: {
        [heading.columnId]: [heading.id, heading2.id, heading3.id],
        [headingFromOtherColumn.columnId]: [headingFromOtherColumn.id],
      },
    };
    expect(HeadingsReducer(initialStateWithFourHeadings, HeadingsActions.insertInPosition({
      position: 0,
      entity: headingFromOtherColumn2,
    }))).toEqual({
      entities: [heading, heading2, heading3, headingFromOtherColumn, headingFromOtherColumn2],
      positions: {
        [heading.columnId]: [heading.id, heading2.id, heading3.id],
        [headingFromOtherColumn.columnId]: [headingFromOtherColumn2.id, headingFromOtherColumn.id],
      },
    });
  });
  it('remove', () => {
    const [heading, heading2, heading3, headingFromOtherColumn] = mockHeadings;
    const initialStateWithFourHeadings = {
      entities: [heading, heading2, heading3, headingFromOtherColumn],
      positions: {
        [heading.columnId]: [heading.id, heading2.id, heading3.id],
        [headingFromOtherColumn.columnId]: [headingFromOtherColumn.id],
      },
    };
    expect(HeadingsReducer(initialStateWithFourHeadings, HeadingsActions.remove({
      id: heading3.id,
    }))).toEqual({
      entities: [heading, heading2, headingFromOtherColumn],
      positions: {
        [heading.columnId]: [heading.id, heading2.id],
        [headingFromOtherColumn.columnId]: [headingFromOtherColumn.id],
      },
    });
  });
});
