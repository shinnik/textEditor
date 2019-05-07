import {Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { selectOptions } from './options';
import { IOption } from '../../../models';
import index from "@angular/cli/lib/cli";
import {EditorListStateManager2Service} from "../../../editor-list/editor-list-state-manager2.service";
import {HistoryManagerService} from "../../../editor-list/history-manager.service";
import ID from "../../../../utils/ID";

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
    if (this.selectedOption.type) {
      const node = {
        action: 'add',
        block: {id, type, content},
        index: this.index,
        redo: () => {
          currentState.splice(this.index + 1, 0, node.block);
        },
        undo: () => {
          debugger;
          const prevNode = this.historyManager.current();
          const prevAction = prevNode ? prevNode.action : null;
          if (prevAction) {
            if (prevAction === 'add') {
              currentState.splice(prevNode.index + 1, 1);
            } else if (prevAction === 'remove') {
              currentState.splice(prevNode.index, 0, prevNode.block);
            }
          } else {
            currentState.splice(node.index + 1, 1);
          }
        },
      };
      this.historyManager.push(node);
      node.redo();
    }
  }

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
