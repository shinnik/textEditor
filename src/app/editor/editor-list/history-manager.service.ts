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
    // console.log('CURRENT HISTORY', this.history);
    // console.log('CURRENT NODE', this.history[this.cursor], this.cursor);
    return this.history[this.cursor];
  }

  prev() {
    const history = this.history[this.cursor - 1];
    // console.log('CURRENT HISTORY', this.history);
    // console.log('CURRENT NODE', this.history[this.cursor - 1], this.cursor - 1);
    // this.cursor = this.cursor - 1;
    return history;

  }

  next() {
    const history = this.history[this.cursor + 1];
    // console.log('CURRENT HISTORY', this.history);
    // console.log('CURRENT NODE', this.history[this.cursor + 1], this.cursor + 1);
    return history;
  }

  push(node) {
    this.history.push(node);
    this.cursor = this.history.length - 1;
  }

  constructor() { }



}
