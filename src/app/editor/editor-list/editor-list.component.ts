import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IBlock, IBlockTypes} from '../models';
import { EditorListStateManagerService } from "./editor-list-state-manager.service";
import ID from '../../utils/ID';


@Component({
  selector: 'app-editor-list',
  templateUrl: './editor-list.component.html',
  styleUrls: ['./editor-list.component.css']
})
export class EditorListComponent implements OnInit {

  // @Output boxType: string;
  // subscription: Subscription;
  public elements: Array<IBlock>;

  constructor(private stateManager: EditorListStateManagerService,
              private cdr: ChangeDetectorRef) {

  }

  onListChange(event) {
    console.log(event);
  }

  ngOnInit() {
    this.stateManager.getState().subscribe((state) => {this.elements = state; console.log(this.elements); this.cdr.detectChanges()});
  }

  onUndo () {
    this.stateManager.prevState();
  }

  onRedo () {
    this.stateManager.nextState();
  }

  onChoose(addingInfo) {
    this.stateManager.setState(addingInfo);
  }

}}
