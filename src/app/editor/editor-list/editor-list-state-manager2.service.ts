import { Injectable } from '@angular/core';
import ID from '../../utils/ID';
import {IBlockTypes} from "../models";

@Injectable({
  providedIn: 'root'
})
export class EditorListStateManager2Service {

  public state = [{
    id: ID(),
    type: IBlockTypes.TEXTBOX,
    content: 'SOME TEXT',
    },
  ];



  constructor() { }

  set (id: string, content: string) {
    console.log('THIS', this);
    const blockToUpdate = this.state.filter((block) => block.id === id)[0];
    console.log(content);
    blockToUpdate.content = content;
    console.log(this.state);
  }

}
