export interface IFile {
  id: string;
  link: string;
  type: string;
  size: string;
  name: string;
}

export interface IImage {
  link: string;
}

export interface IComment {
  id: string;
  date: number;
  todoId: string;
  text?: string;
  attachedFiles?: Array<IFile>;
  likes?: Array<string>;
  isEdited?: boolean;
}

export type IComments = Array<IComment>;
