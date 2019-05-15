import {Component, Input, OnInit} from '@angular/core';
import {EditorListStateManager2Service} from "../../../editor-list/editor-list-state-manager2.service";
import {HistoryManagerService} from "../../../editor-list/history-manager.service";
import {EditorAction} from "../adding-button/adding-button.component";

class ActionRemoveBlock extends EditorAction {

  currentState;
  index;
  block;

  constructor(currentState, block, index) {
    super();
    this.currentState = currentState;
    this.block = block;
    this.index = index;
  }

  undo() {
    this.currentState.splice(this.index, 0, this.block);
  }

  redo() {
    this.currentState.splice(this.index, 1);

  }
}

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {

  @Input('index') index: number;

  constructor(private stateManager: EditorListStateManager2Service,
              private historyManager: HistoryManagerService) { }

  ngOnInit() {
  }

  onDeleteButtonClick() {
    const currentState = this.stateManager.state;
    const block = this.stateManager.state[this.index];
    const action = new ActionRemoveBlock(currentState, block, this.index);
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
}
