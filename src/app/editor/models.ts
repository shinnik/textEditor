
export interface IBlock {
  id: string;
  type: string;
  content: string;
}

export interface IEditorBlock extends IBlock {
  extra: any;
}

export interface IHeaderBlock extends IBlock {
  extra: any;
}

export enum IBlockTypes {
  TEXTBOX = 'TEXTBOX',
  HEADER = 'HEADER',
  CODE = 'CODE'
}

export interface IOption {
  name: string;
  type: string;
  content: string;
}

export type Options = Array <IOption>;

