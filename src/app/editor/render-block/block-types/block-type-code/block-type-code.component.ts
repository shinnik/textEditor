import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs/index";
import {debounceTime, tap} from "rxjs/internal/operators";

@Component({
  selector: 'app-block-type-code',
  templateUrl: './block-type-code.component.html',
  styleUrls: ['./block-type-code.component.css']
})
export class BlockTypeCodeComponent implements OnInit {

  public content = null;
  @ViewChild('codemirror') target: ElementRef;


  constructor() { }

  ngOnInit() {
    // console.log(this.target.nativeElement);
    const editor = CodeMirror(this.target.nativeElement);
    editor.setValue(this.content);
    fromEvent(this.target.nativeElement, 'input').pipe(
      debounceTime(1000),
      tap(a => console.log(this.target.nativeElement, this.target.nativeElement.innerHTML))
    ).subscribe();
  }

}
