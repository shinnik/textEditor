import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryManagerService {

  history: any[] = [];
  cursor: number = null;

  current() {
    console.log('CURRENT HISTORY', this.history);
    return this.history[this.cursor];
  }

  prev() {
    if (this.cursor > 0) {
      this.cursor--;
      console.log('PREV', this.history[this.cursor]);
      return this.history[this.cursor + 1];
    } else {
      return this.history[0];
    }

  }

  next() {
    if (this.cursor < this.history.length - 1) {
      this.cursor++;
      console.log('NEXT', this.history[this.cursor - 1], this.cursor - 1);
      return this.history[this.cursor];
    } else {
      return this.history[this.history.length - 1];
    }
  }

  push(node) {
    this.history.push(node);
    this.cursor = this.history.length - 1;
  }

  constructor() { }



}
