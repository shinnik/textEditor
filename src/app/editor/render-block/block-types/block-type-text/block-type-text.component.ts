import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IBlock} from "../../../models";
// import { Subscription } from "rxjs/index";
// import { EditorListStateManagerService } from "../../../editor-list/editor-list-state-manager.service";
// import ID from '../../../../utils/ID';

@Component({
  selector: 'app-block-type-text',
  templateUrl: './block-type-text.component.html',
  styleUrls: ['./block-type-text.component.css']
})
export class BlockTypeTextComponent implements OnInit {

  // @Input() content: string;
  // @Input() id: string;
  @Input() block: IBlock;

  ngOnInit() {

  }


  styleEmit(command) {
    document.execCommand(command, false, null);
  }

  textChanged(event) {
    console.log(event);
  }

}
