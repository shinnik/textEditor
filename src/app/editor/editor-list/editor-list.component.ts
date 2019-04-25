import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
              private historyManager: HistoryManagerService,
              private cdr: ChangeDetectorRef) {

  }

  onListChange(event) {
    console.log(event);
  }

  ngOnInit() {
    console.log(this.stateManager.state);
    this.elements = this.stateManager.state;
    console.log(this.elements, 'ELEMENTS');
  }

  onUndo () {
    // debugger;
    // console.log(this.historyManager.current().undo());
    // this.historyManager.prev().undo();
    this.historyManager.prev().undo();
    this.elements = this.stateManager.state;
    // this.stateManager.prevState();
  }

  onRedo () {
    this.historyManager.next().redo();
    this.elements = this.stateManager.state;
  }

  onChoose(addingInfo) {
    const {name, index, ...block} = addingInfo;
    this.stateManager.state.push({id: ID(), ...block});
  }

}
