import {Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { selectOptions } from './options';
import { IOption } from '../../../models';
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-adding-button',
  templateUrl: './adding-button.component.html',
  styleUrls: ['./adding-button.component.css']
})
export class AddingButtonComponent implements OnInit {

  @Input('index') index: number;
  @Output('choose') onAddingButtonClicked: EventEmitter<object> = new EventEmitter<object>();
  @ViewChild('selection') selection: ElementRef;

  initialOption: IOption = {
    name: 'Выберите тип...',
    type: null,
    content: null
  };

  clicked = false;
  selectedOption = this.initialOption;

  options = selectOptions;

  constructor() {

  }

  ngOnInit() {
    // console.log(this.index);
  }

  onSelected(selectedOption: IOption) {
    this.selectedOption = selectedOption;
    if (this.selectedOption.type) {
      this.onAddingButtonClicked.emit({
        ...this.selectedOption,
        index: this.index
      });
      console.log(this.selectedOption);
      // return to initial option where was 'Выберите тип...'
      this.selection.nativeElement.selectedIndex = 0;
    }

  }

  onPlusButtonClick() {
    this.clicked = !this.clicked;
  }

}
