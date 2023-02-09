import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  stateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() { }

  setState(state: boolean){
    this.stateChanged.emit(state);
  }
}
