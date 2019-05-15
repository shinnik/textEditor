import {Component, ElementRef, OnInit, ViewChild, Input, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {fromEvent} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";
import {HistoryManagerService} from "../../../editor-list/history-manager.service";
import {IBlock} from "../../../models";
import {UpdateAction} from "../../../../shared/input-field/input-field.component";

import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/lib/codemirror.css';

@Component({
  selector: 'app-block-type-code',
  templateUrl: './block-type-code.component.html',
  styleUrls: ['./block-type-code.component.css']
})
export class BlockTypeCodeComponent implements AfterViewInit {

  @Input() block: IBlock;
  @ViewChild('codemirror') target: ElementRef;

  modes = {
    javascript: 'javascript',
    css: 'css',
    html: 'htmlmixed'
  }


  constructor(private historyManager: HistoryManagerService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // console.log(this.target.nativeElement);
    // this.cdr.detectChanges();
    const editor = CodeMirror(this.target.nativeElement, {mode: this.modes.javascript});
    console.log('CONTENT', this.block.content);
    editor.setValue(this.block.content);
    fromEvent(this.target.nativeElement, 'input').pipe(
      debounceTime(500),
      tap(a => {
        const prevValue = this.block.content;
        const newValue = editor.getValue();
        const action = new UpdateAction(prevValue, newValue, this.block);
        console.log(action, this.block);
        const node = {
          action,
          undo: () => {
            action.undo();
            // console.log(this.block.content, 'CONTENT11');
            editor.setValue(this.block.content);
          },
          redo: () => {
            debugger;
            // console.log(action);
            action.redo();
            // console.log(this.block.content, 'CONTENT22');
            editor.setValue(this.block.content);
          }
        };
        this.historyManager.undoStack.push(node);
        node.redo();
        // editor.setValue(newValue);
      })).subscribe();
  }
}
