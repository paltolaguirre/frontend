import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public show() {
    this.loadingEmitter.emit(true);
  }

  public hide() {
    this.loadingEmitter.emit(false);
  }
}
