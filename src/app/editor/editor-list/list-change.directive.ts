import {AfterViewInit, Directive, ElementRef, EventEmitter} from '@angular/core';
import {Output} from "@angular/core";

@Directive({
  selector: '[appListChange]'
})
export class ListChangeDirective implements AfterViewInit {

  public observer: MutationObserver;
  @Output() appListChange = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    this.observer = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        this.appListChange.emit(mutation);
      });
    });
    const config = { childList: true, characterData: true, subtree: false, attributes: true, attributeFilter: ['id'] };

    this.observer.observe(this.elRef.nativeElement, config);
  }
}
