import { IBlockTypes, IOption, Options } from '../../../models';

export const selectOptions: Options = [
  {
    name: 'Текст',
    type: IBlockTypes.TEXTBOX,
    content: 'Текст'
  },
  {
    name: 'Заголовок',
    type: IBlockTypes.HEADER,
    content: '<h1>Заголовок</h1>'
  },
  {
    name: 'Код',
    type: IBlockTypes.CODE,
    content: 'function f () {}'
  }
]

