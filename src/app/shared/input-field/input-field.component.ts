import {
  Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, ViewChild,
  ElementRef, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import {EditorListStateManager2Service} from "../../editor/editor-list/editor-list-state-manager2.service";
import {fromEvent, Subscription} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";
import {HistoryManagerService} from "../../editor/editor-list/history-manager.service";
import {IBlock} from "../../editor/models";
import {EditorAction, ActionAddBlock} from '../../editor/render-block/block-types/adding-button/adding-button.component';


export class UpdateAction extends EditorAction {

  newContent;
  prevContent;
  block;
  editor;

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
  styleUrls: ['./input-field.component.less']
})
export class InputFieldComponent implements AfterViewInit {

  @Output() textChanged = new EventEmitter<boolean>();

  @Input() initialContent: any;
  @Output() textSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('inputField') inputField: ElementRef;
  @Input() block: IBlock;

  content = '';

  constructor(private stateManager: EditorListStateManager2Service,
              private historyManager: HistoryManagerService,
              private cdr: ChangeDetectorRef) {

  };

  checkSelection(event) {
    const sel = document.getSelection();
    if (sel.toString()) {
      this.textSelected.emit(true);
    }
  }

  onChangeHandler(event) {
    console.log(event.target.innerHTML);
  }

  onEnterPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      const index = this.stateManager.state.findIndex((el) => el === this.block);
      const selectedType = 'TEXTBOX';
      const currentState = this.stateManager.state;
      if (selectedType) {
        const action = new ActionAddBlock(selectedType, currentState, index + 1);
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
  }

  onInput() {
    this.cdr.detectChanges();
    if (this.inputField.nativeElement.innerHTML !== '') {
      this.inputField.nativeElement.classList.add('placeholder-hide');
    } else if (this.inputField.nativeElement.innerHTML === '') {
      this.inputField.nativeElement.classList.remove('placeholder-hide');
    }
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

  // ngOnInit() {
  //   if (this.inputField.nativeElement.innerHTML !== '') {
  //     this.inputField.nativeElement.classList.add('placeholder-hide');
  //   } else if (this.inputField.nativeElement.innerHTML === '' ) {
  //     this.inputField.nativeElement.classList.remove('placeholder-hide');
  //   }
  // }

  ngAfterViewInit() {

    console.log('REINIT');

    if (this.inputField.nativeElement.innerHTML !== '') {
      this.inputField.nativeElement.classList.add('placeholder-hide');
    } else if (this.inputField.nativeElement.innerHTML === '' ) {
      this.inputField.nativeElement.classList.remove('placeholder-hide');
    }

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
