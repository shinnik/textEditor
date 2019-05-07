import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryManagerService {

  history: any[] = [{}];
  cursor = null;

  undoStack = [];
  redoStack = [];

  current() {
    console.log('CURRENT HISTORY', this.history);
    console.log('CURRENT NODE', this.history[this.cursor], this.cursor);
    return this.history[this.cursor];
  }

  prev() {
    const history = this.history[this.cursor - 1];
    console.log('CURRENT HISTORY', this.history);
    console.log('CURRENT NODE', this.history[this.cursor - 1], this.cursor - 1);
    // this.cursor = this.cursor - 1;
    return history;

    /*if (this.cursor > 0) {
      this.cursor--;
      console.log('PREV', this.history[this.cursor + 1], this.cursor + 1);
      return this.history[this.cursor + 1];
    } else {
      this.cursor = -1;
      return this.history[0];
    }*/

  }

  next() {
    const history = this.history[this.cursor + 1];
    console.log('CURRENT HISTORY', this.history);
    console.log('CURRENT NODE', this.history[this.cursor + 1], this.cursor + 1);
    // this.cursor = this.cursor + 1;
    return history;

    /*if (this.cursor >= -1 && this.cursor < this.history.length - 1) {
      this.cursor++;
      console.log('NEXT', this.history[this.cursor - 1], this.cursor - 1);
      return this.history[this.cursor];
    } else {
      this.cursor = this.history.length - 1;
      return this.history[this.history.length - 1];
    }*/

  }

  push(node) {
    this.history.push(node);
    this.cursor = this.history.length - 1;
  }

  constructor() { }



}
