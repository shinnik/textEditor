import {ChangeDetectorRef, Component, OnInit, HostListener} from '@angular/core';
import {IBlock, IBlockTypes} from '../models';
import { EditorListStateManagerService } from "./editor-list-state-manager.service";
import ID from '../../utils/ID';
import {HistoryManagerService} from "./history-manager.service";
import {EditorListStateManager2Service} from "./editor-list-state-manager2.service";


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

  onListChange(event) {
    console.log(event);
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
    const redoAction = this.historyManager.undoStack.pop();
    redoAction.undo();
    this.historyManager.redoStack.push(redoAction);
    console.log('UNDO', this.historyManager.undoStack);
    console.log('REDO', this.historyManager.redoStack);

    this.elements = this.stateManager.state;
  }

  onRedo () {
    const undoAction = this.historyManager.redoStack.pop();
    console.log(undoAction);
    undoAction.redo();
    this.historyManager.undoStack.push(undoAction);
    console.log('UNDO', this.historyManager.undoStack);
    console.log('REDO', this.historyManager.redoStack);

    // console.log(this.historyManager.history, 'HISTORY');
    this.elements = this.stateManager.state;
  }

  onChoose(addingInfo) {
    // const {name, index, ...block} = addingInfo;
    // this.stateManager.state.push({id: ID(), ...block});
  }

}
