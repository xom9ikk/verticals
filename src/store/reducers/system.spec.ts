import { SystemActions } from '@store/actions';
import { initialState, SystemReducer } from '@store/reducers/system';
import { EnumLanguage } from '@type/entities';

describe('System reducer', () => {
  it('set is loaded boards', () => {
    expect(SystemReducer(initialState, SystemActions.setIsLoadedBoards(true))).toEqual({
      ...initialState,
      isLoadedBoards: true,
    });
  });
  it('set is loaded columns', () => {
    expect(SystemReducer(initialState, SystemActions.setIsLoadedColumns(true))).toEqual({
      ...initialState,
      isLoadedColumns: true,
    });
  });
  it('set is loaded todos', () => {
    expect(SystemReducer(initialState, SystemActions.setIsLoadedTodos(true))).toEqual({
      ...initialState,
      isLoadedTodos: true,
    });
  });
  it('set active popup id', () => {
    expect(SystemReducer(initialState, SystemActions.setActivePopupId('menu-popup'))).toEqual({
      ...initialState,
      activePopupId: 'menu-popup',
    });
  });
  it('set editable board id', () => {
    expect(SystemReducer(initialState, SystemActions.setEditableBoardId(13))).toEqual({
      ...initialState,
      editableBoardId: 13,
    });
  });
  it('set editable column id', () => {
    expect(SystemReducer(initialState, SystemActions.setEditableColumnId(13))).toEqual({
      ...initialState,
      editableColumnId: 13,
    });
  });
  it('set editable card id', () => {
    expect(SystemReducer(initialState, SystemActions.setEditableCardId(13))).toEqual({
      ...initialState,
      editableCardId: 13,
    });
  });
  it('set editable card id', () => {
    expect(SystemReducer(initialState, SystemActions.setEditableSubCardId(17))).toEqual({
      ...initialState,
      editableSubCardId: 17,
    });
  });
  it('set is search mode', () => {
    expect(SystemReducer(initialState, SystemActions.setIsSearchMode(true))).toEqual({
      ...initialState,
      isSearchMode: true,
    });
  });
  it('set language', () => {
    expect(SystemReducer(initialState, SystemActions.setLanguage(EnumLanguage.French))).toEqual({
      ...initialState,
      language: EnumLanguage.French,
    });
  });
  it('set active todo id', () => {
    expect(SystemReducer(initialState, SystemActions.setActiveTodoId(13))).toEqual({
      ...initialState,
      activeTodoId: 13,
    });
  });
  it('set edit comment id', () => {
    expect(SystemReducer(initialState, SystemActions.setEditCommentId(13))).toEqual({
      ...initialState,
      editCommentId: 13,
    });
  });
  it('set reply comment id', () => {
    expect(SystemReducer(initialState, SystemActions.setReplyCommentId(13))).toEqual({
      ...initialState,
      replyCommentId: 13,
    });
  });
  it('set is open profile', () => {
    expect(SystemReducer(initialState, SystemActions.setIsOpenProfile(true))).toEqual({
      ...initialState,
      isOpenProfile: true,
    });
  });
  it('set active board id', () => {
    expect(SystemReducer(initialState, SystemActions.setActiveBoardId(13))).toEqual({
      ...initialState,
      activeBoardId: 13,
    });
  });
  it('set active board readable id', () => {
    expect(SystemReducer(initialState, SystemActions.setActiveBoardReadableId('today-board-aef'))).toEqual({
      ...initialState,
      activeBoardReadableId: 'today-board-aef',
    });
  });
  it('set active todo readable id', () => {
    expect(SystemReducer(initialState, SystemActions.setActiveTodoReadableId('todo-some-thing-eac'))).toEqual({
      ...initialState,
      activeTodoReadableId: 'todo-some-thing-eac',
    });
  });
  it('set dropped files', () => {
    expect(SystemReducer(initialState, SystemActions.setDroppedFiles(null))).toEqual({
      ...initialState,
      droppedFiles: null,
    });
  });
  it('set gallery images info', () => {
    const info = {
      images: [{
        id: 1,
        todoId: 22,
        commentId: 33,
        path: '/path/to/file',
        name: 'backup',
        extension: 'zip',
        size: 124389,
        mimeType: 'image/png',
        encoding: '7bit',
      }],
      index: 0,
    };
    expect(SystemReducer(initialState, SystemActions.setGalleryImagesInfo(info))).toEqual({
      ...initialState,
      galleryImagesInfo: info,
    });
  });
  it('set is open formatting help', () => {
    expect(SystemReducer(initialState, SystemActions.setIsOpenFormattingHelp(true))).toEqual({
      ...initialState,
      isOpenFormattingHelp: true,
    });
  });
});
