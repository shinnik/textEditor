import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {fromEvent} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";
import {HistoryManagerService} from "../../../editor-list/history-manager.service";
import {IBlock} from "../../../models";
import CodeMirror from 'codemirror';

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
        const firstNode = this.historyManager.history.length;
        this.block.content = editor.getValue();
        const node = {
          currentContent: editor.getValue(),
          undo: () => {
            console.log(firstNode);
            if (firstNode) {
              this.historyManager.current().redo();
            } else {
              this.block.content = '';
              editor.setValue(this.block.content);
            }
          },
          redo: () => {
            this.block.content = node.currentContent;
            editor.setValue(this.block.content);
          }
        };
        this.historyManager.push(node);
      })).subscribe();

  }
}
