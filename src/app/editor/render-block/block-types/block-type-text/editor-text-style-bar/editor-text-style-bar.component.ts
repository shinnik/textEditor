import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editor-text-style-bar',
  templateUrl: './editor-text-style-bar.component.html',
  styleUrls: ['./editor-text-style-bar.component.css']
})
export class EditorTextStyleBarComponent implements OnInit {

  @Output('style') styleEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  iBold() {
    this.styleEmitter.emit('bold');
  }

  iItalic() {
    this.styleEmitter.emit('italic');
  }

  ngOnInit() {
  }

}
