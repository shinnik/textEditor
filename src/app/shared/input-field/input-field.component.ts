import {
  Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, ViewChild,
  ElementRef
} from '@angular/core';
import {EditorListStateManager2Service} from "../../editor/editor-list/editor-list-state-manager2.service";
import {fromEvent, Subscription} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";
import {HistoryManagerService} from "../../editor/editor-list/history-manager.service";
import update from "../../editor/editor-list/utils";
import {IBlock} from "../../editor/models";


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
        const id = this.inputField.nativeElement.parentElement.id;
        const firstNode = this.historyManager.history.length;
        this.block.content = this.inputField.nativeElement.innerHTML;
        console.log(this.block);
        const node = {
          currentContent: this.inputField.nativeElement.innerHTML,
          undo: () => {
            debugger;
            console.log(firstNode);
            if (firstNode) {
              this.historyManager.current().redo();
            } else {
              this.block.content = '';
            }
          },
          redo: () => {
            this.block.content = node.currentContent;
          }
        };
        this.historyManager.push(node);
      }/*this.stateManager.updateBlock(
        this.inputField.nativeElement.parentElement.id,
        this.inputField.nativeElement.innerHTML)*/)
    ).subscribe();
  }


}
