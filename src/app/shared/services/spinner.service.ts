import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  stateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  show(){
    this.stateChanged.emit(true);
  }
  hide(){
    this.stateChanged.emit(false);
  }
}
