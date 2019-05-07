import {Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { selectOptions } from './options';
import {IBlock, IBlockTypes, IOption} from '../../../models';
import index from "@angular/cli/lib/cli";
import {EditorListStateManager2Service} from "../../../editor-list/editor-list-state-manager2.service";
import {HistoryManagerService} from "../../../editor-list/history-manager.service";
import ID from "../../../../utils/ID";
import {BlockType} from 'codelyzer/angular/styles/cssAst';

enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
  UPDATE = 'update',
  MOVE = 'move'
}

export class EditorAction {
  constructor() {
  }
}

class ActionAddBlock extends EditorAction {

  defaultValueBlock = {
    [IBlockTypes.TEXTBOX]: {
      id: ID(),
      type: IBlockTypes.TEXTBOX,
      content: 'asadf'
    },
    [IBlockTypes.CODE]: {
      id: ID(),
      type: IBlockTypes.CODE,
      content: 'function () {}'
    },
    [IBlockTypes.HEADER]: {
      id: ID(),
      type: IBlockTypes.HEADER,
      content: '<h1>asdf</h1>'
    },
  };

  block: IBlock;
  currentState = [];
  index = 0;

  constructor(blockType, currentState, index) {
    super();
    this.block = this.defaultValueBlock[blockType];
    this.currentState = currentState;
    this.index = index;
  }

  undo() {
    this.currentState.splice(this.index, 1);
  }

  redo() {
    this.currentState.splice(this.index, 0, this.block);
  }
}

class ActionRemoveBlock extends EditorAction {

}

@Component({
  selector: 'app-adding-button',
  templateUrl: './adding-button.component.html',
  styleUrls: ['./adding-button.component.css']
})
export class AddingButtonComponent implements OnInit {

  @Input('index') index: number;
  @Output('choose') onAddingButtonClicked: EventEmitter<object> = new EventEmitter<object>();
  @ViewChild('selection') selection: ElementRef;

  initialOption: IOption = {
    name: 'Выберите тип...',
    type: null,
    content: null
  };

  clicked = false;
  selectedOption = this.initialOption;

  options = selectOptions;

  constructor(private stateManager: EditorListStateManager2Service,
              private historyManager: HistoryManagerService) {

  }

  ngOnInit() {
    // console.log(this.index);
  }

  onSelected2 (selectedOption: IOption) {
    this.selectedOption = selectedOption;
    const currentState = this.stateManager.state;
    const id = ID();
    console.log(id, 'IDID');
    const {type, content} = selectedOption;
    console.log(this.index);
    const selectedType = this.selectedOption.type;
    if (this.selectedOption.type) {
      const action = new ActionAddBlock(selectedType, currentState, this.index + 1);
      const node = {
        action,
        redo: () => {
          action.redo();

          /*currentState.splice(node.index, 0, node.block as any);
          console.log(this.historyManager.history);*/
        },
        undo: () => {
          action.undo();

          /*console.log(node);
          const prevNode = this.historyManager.prev();
          const action = this.revertAction(prevNode);
          const nodeIndex = prevNode && prevNode.index ? prevNode.index : node.index;
          switch (action) {
            case ActionType.ADD:
              currentState.splice(nodeIndex, 0, prevNode.block);
              break;
            case ActionType.REMOVE:
              currentState.splice(node.index, 1);
              break;
            default:
              console.log('defatut');
              break;
          }*/
          /*const prevAction = prevNode ? prevNode.action : null;
          if (prevAction) {
            if (prevAction === 'add') {
              currentState.splice(prevNode.index + 1, 1);
            } else if (prevAction === 'remove') {
              currentState.splice(prevNode.index + 1, 0, prevNode.block);
            }
          } else {
            currentState.splice(node.index + 1, 1);
          }*/
        },
      };
      // this.historyManager.push(node);
      this.historyManager.undoStack.push(node);
      // this.historyManager.cursor = this.historyManager.history.length - 1;
      node.redo();
    }
  }

  revertAction = prevNode => prevNode && prevNode.action === ActionType.REMOVE ? ActionType.ADD : ActionType.REMOVE;

  // onSelected2(selectedOption: IOption) {
  //   this.selectedOption = selectedOption;
  //   const currentState = this.stateManager.state;
  //   const id = ID();
  //   console.log(id, 'IDID');
  //   const {type, content} = selectedOption;
  //   if (this.selectedOption.type) {
  //     const node = {
  //       redo: () => {
  //         console.log(node.redo.action);
  //         if (!node.redo.action) {
  //           node.redo.action = 'add';
  //           currentState.splice(this.index + 1, 0, {id, type, content});
  //         } else {
  //           switch (node.redo.action) {
  //             case 'add':
  //               currentState.splice(this.index + 1, 0, {id, type, content});
  //               break;
  //             case 'remove':
  //               currentState.splice(this.index + 1, 1);
  //               break;
  //           }
  //         }
  //         const action = this.historyManager.history[0].redo.action;
  //         this.historyManager.history[0].redo.action = this.reverseAction(action);
  //       },
  //       undo: () => {
  //         // currentState.splice(this.index + 1, 1);
  //         console.log(this.historyManager.history[0].redo.action);
  //         const action = this.historyManager.history[0].redo.action;
  //         this.historyManager.history[0].redo.action = this.reverseAction(action);
  //         this.historyManager.history[0].redo();
  //       }
  //     };
  //     this.historyManager.push(node);
  //     node.redo();
  //   }
  // }

  reverseAction(action: string) {
    return action === 'add' ? 'remove' : 'add';
  }

  onSelected(selectedOption: IOption) {
    this.selectedOption = selectedOption;
    if (this.selectedOption.type) {
      this.onAddingButtonClicked.emit({
        ...this.selectedOption,
        index: this.index
      });
      console.log(this.selectedOption);
      // return to initial option where was 'Выберите тип...'
      this.selection.nativeElement.selectedIndex = 0;
    }

  }

  onPlusButtonClick() {
    this.clicked = !this.clicked;
  }

}
