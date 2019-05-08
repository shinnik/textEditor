import { Component, OnInit } from '@angular/core';
import {IBlock} from "../../../models";

@Component({
  selector: 'app-block-type-header',
  templateUrl: './block-type-header.component.html',
  styleUrls: ['./block-type-header.component.css']
})
export class BlockTypeHeaderComponent implements OnInit {

  public id: string;
  public block: IBlock;

  constructor() { }

  ngOnInit() {

  }

  styleEmit(command) {
    document.execCommand(command, false, null);
  }

}
