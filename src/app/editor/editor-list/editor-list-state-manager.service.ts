import {Injectable, OnInit} from '@angular/core';
// import {Observable, Subject} from "rxjs/index";
import {of, Observable, BehaviorSubject} from "rxjs/index";
import ID from '../../utils/ID';
import {IBlock, IBlockTypes} from '../models';
import {HistoryManagerService} from "./history-manager.service";
import { StateHistory } from "./history";


@Injectable({
  providedIn: 'root'
})
export class EditorListStateManagerService {

  private initialState = {
    id: ID(),
    type: IBlockTypes.TEXTBOX,
    content: 'SOME TEXT',
  }

  private history = new StateHistory(this.initialState);
  private observableState = new BehaviorSubject(this.history.currentState);


  prevState() {
    this.history.undo();
    this.observableState.next(this.history.currentState);

  }

  nextState() {
    this.history.redo();
    console.log('STATE', this.history.currentState);
    this.observableState.next(this.history.currentState);

  }

  updateBlock(blockID: string, content: string): void {
    this.history.update(blockID, content);
    this.observableState.next(this.history.currentState);

  }

  setState(addingInfo: any): void {

    const index = addingInfo.index;
    const newBlock = {
      id: ID(),
      type: addingInfo.type,
      content: addingInfo.content,
      anchor: index
    };
    this.history.push(newBlock);
    // debugger;
    // this.historyManager.addHistory(this.currentState.historyIndex, newBlock)
    // this.initialState.splice(addingInfo.index + 1, 0, newBlock);

    console.log('HISTORY', this.history.currentState)
    this.observableState.next(this.history.currentState);

  }

  getState(): any {
    return this.observableState;

  }


}
