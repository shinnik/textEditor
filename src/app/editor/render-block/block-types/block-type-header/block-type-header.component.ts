import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-type-header',
  templateUrl: './block-type-header.component.html',
  styleUrls: ['./block-type-header.component.css']
})
export class BlockTypeHeaderComponent implements OnInit {

  public id: string;

  constructor() { }

  ngOnInit() {

  }

  styleEmit(command) {
    document.execCommand(command, false, null);
  }

}
