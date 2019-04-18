import {
  Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, ViewChild,
  ElementRef
} from '@angular/core';
import {EditorListStateManagerService} from "../../editor/editor-list/editor-list-state-manager.service";
import {fromEvent, Subscription} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";


@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent implements OnInit {


  @Input() initialContent: any;
  @Output() textSelected: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('inputField') inputField: ElementRef;

  checkSelection(event) {
    const sel = document.getSelection();
    if (sel.toString()) {
      this.textSelected.emit(true);
    }
  }

  onChangeHandler(event) {
    console.log(event.target.innerHTML);
  }

  constructor(private stateManager: EditorListStateManagerService) {

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
    console.log(this.inputField);
    fromEvent(this.inputField.nativeElement, 'input').pipe(
      debounceTime(500),
      tap(a => this.stateManager.updateBlock(
        this.inputField.nativeElement.parentElement.id,
        this.inputField.nativeElement.innerHTML))
    ).subscribe();
  }


}
