import {
  Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, ViewChild,
  ElementRef
} from '@angular/core';
import {EditorListStateManager2Service} from "../../editor/editor-list/editor-list-state-manager2.service";
import {fromEvent, Subscription} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";
import {HistoryManagerService} from "../../editor/editor-list/history-manager.service";
import {IBlock} from "../../editor/models";
import {EditorAction} from '../../editor/render-block/block-types/adding-button/adding-button.component';


export class UpdateAction extends EditorAction {

  newContent;
  prevContent;
  block;

  constructor(prevContent, newContent, block) {
    super();
    this.block = block;
    this.prevContent = prevContent;
    this.newContent = newContent;
  }

  redo() {
    this.block.content = this.newContent;
  }

  undo() {
    this.block.content = this.prevContent;
  }
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {

  @Output() textChanged = new EventEmitter<boolean>();

  @Input() initialContent: any;
  @Output() textSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('inputField') inputField: ElementRef;
  @Input() block: IBlock;

  content = '';

  checkSelection(event) {
    const sel = document.getSelection();
    if (sel.toString()) {
      this.textSelected.emit(true);
    }
  }

  onChangeHandler(event) {
    console.log(event.target.innerHTML);
  }

  constructor(private stateManager: EditorListStateManager2Service,
              private historyManager: HistoryManagerService) {

  }
  // private getCaretCoords() {
  //   let range, rect, rects, sel;
  //   let x = 0;
  //   let y = 0;
  //   sel = window.getSelection();
  //   if (sel.rangeCount) {
  //     range = sel.getRangeAt(0).cloneRange();
  //     console.log(range);
  //     if (range.getClientRects) {
  //       range.collapse(true);
  //       rects = range.getClientRects();
  //       if (rects.length > 0) {
  //         rect = rects[0];
  //       }
  //       x = rect.left;
  //       y = rect.top;
  //       return {x: x, y: y};
  //     }
  //   }
  // }
  ngOnInit() {
    // console.log(this.inputField);

    fromEvent(this.inputField.nativeElement, 'input').pipe(
      debounceTime(500),
      tap(a => {
        const action = new UpdateAction(this.content, this.inputField.nativeElement.innerHTML, this.block);
        this.content = this.inputField.nativeElement.innerHTML;
        const node = {
          action,
          undo: () => {
            action.undo();
          },
          redo: () => {
            action.redo();
          }
        };

        // this.block.content = this.inputField.nativeElement.innerHTML;
        this.historyManager.undoStack.push(node);
        node.redo();
      })
    ).subscribe();
  }


}
