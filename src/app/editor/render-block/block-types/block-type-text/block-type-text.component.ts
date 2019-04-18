import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
// import { Subscription } from "rxjs/index";
// import { EditorListStateManagerService } from "../../../editor-list/editor-list-state-manager.service";
// import ID from '../../../../utils/ID';

@Component({
  selector: 'app-block-type-text',
  templateUrl: './block-type-text.component.html',
  styleUrls: ['./block-type-text.component.css']
})
export class BlockTypeTextComponent implements OnInit {

  public content: string;
  public id: string;

  ngOnInit() {

  }


  styleEmit(command) {
    document.execCommand(command, false, null);
  }
}
