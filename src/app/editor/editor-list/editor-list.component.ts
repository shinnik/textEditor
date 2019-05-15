import {ChangeDetectorRef, Component, OnInit, HostListener} from '@angular/core';
import {IBlock, IBlockTypes} from '../models';
import { EditorListStateManagerService } from "./editor-list-state-manager.service";
import ID from '../../utils/ID';
import {HistoryManagerService} from "./history-manager.service";
import {EditorListStateManager2Service} from "./editor-list-state-manager2.service";

import { iconDragNDrop, iconPlus, iconFailed } from '../../../icons';

@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.css']
})
export class EditorListComponent implements OnInit {

  // @Output boxType: string;
  // subscription: Subscription;
  public elements: Array<IBlock>;

  constructor(public stateManager: EditorListStateManager2Service,
              public historyManager: HistoryManagerService,
              private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.elements = this.stateManager.state;



  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.keyCode === 90) {
      event.preventDefault();
      console.log(event);
      this.onUndo();
    } else if (event.ctrlKey && event.keyCode === 89) {
      event.preventDefault();
      console.log(event);
      this.onRedo();
    }
  }

  onUndo () {
    if (this.historyManager.undoStack.length) {
      const redoAction = this.historyManager.undoStack.pop();
      redoAction.undo();
      console.log(redoAction);
      this.historyManager.redoStack.push(redoAction);
      this.elements = this.stateManager.state;
      console.log('UNDO', this.elements);
      console.log('UNDO', this.historyManager.undoStack);
    }
  }

  onRedo () {
    if (this.historyManager.redoStack.length) {
      const undoAction = this.historyManager.redoStack.pop();
      console.log(undoAction);
      undoAction.redo();
      this.historyManager.undoStack.push(undoAction);
      this.elements = this.stateManager.state;
      console.log('REDO', this.elements);
      console.log('REDO', this.historyManager.redoStack);
    }
  }

}
