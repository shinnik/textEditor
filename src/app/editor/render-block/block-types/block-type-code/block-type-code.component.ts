import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {fromEvent} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";
import {HistoryManagerService} from "../../../editor-list/history-manager.service";
import {IBlock} from "../../../models";
import {UpdateAction} from "../../../../shared/input-field/input-field.component";
// import CodeMirror from 'codemirror';

@Component({
  selector: 'app-block-type-code',
  templateUrl: './block-type-code.component.html',
  styleUrls: ['./block-type-code.component.css']
})
export class BlockTypeCodeComponent implements OnInit {

  @Input() block: IBlock;
  @ViewChild('codemirror') target: ElementRef;


  constructor(private historyManager: HistoryManagerService) { }

  ngOnInit() {
    // console.log(this.target.nativeElement);
    const editor = CodeMirror(this.target.nativeElement);
    editor.setValue(this.block.content);
    fromEvent(this.target.nativeElement, 'input').pipe(
      debounceTime(500),
      tap(a => {
        const prevValue = this.block.content;
        const newValue = editor.getValue();
        const action = new UpdateAction(prevValue, newValue, this.block)
        const node = {
          action,
          undo: () => {
            action.undo();
          },
          redo: () => {
            action.redo();
          }
        };

        this.historyManager.undoStack.push(node);
      })).subscribe();

  }
}
