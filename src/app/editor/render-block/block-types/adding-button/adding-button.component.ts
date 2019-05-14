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

export class ActionAddBlock extends EditorAction {

  defaultValueBlock = {
    [IBlockTypes.TEXTBOX]: {
      id: ID(),
      type: IBlockTypes.TEXTBOX,
      content: ''
    },
    [IBlockTypes.CODE]: {
      id: ID(),
      type: IBlockTypes.CODE,
      content: ''
    },
    [IBlockTypes.HEADER]: {
      id: ID(),
      type: IBlockTypes.HEADER,
      content: ''
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

  onSelected (selectedOption: IOption) {
    this.selectedOption = selectedOption;
    const currentState = this.stateManager.state;
    const id = ID();
    const selectedType = this.selectedOption.type;
    if (this.selectedOption.type) {
      const action = new ActionAddBlock(selectedType, currentState, this.index + 1);
      const node = {
        action,
        redo: () => {
          action.redo();
        },
        undo: () => {
          action.undo();
        },
      };
      this.historyManager.undoStack.push(node);
      node.redo();
    }
    this.clicked = !this.clicked;
  }

  // revertAction = prevNode => prevNode && prevNode.action === ActionType.REMOVE ? ActionType.ADD : ActionType.REMOVE;

  // reverseAction(action: string) {
  //   return action === 'add' ? 'remove' : 'add';
  // }


  onPlusButtonClick() {
    this.clicked = !this.clicked;
  }

}
