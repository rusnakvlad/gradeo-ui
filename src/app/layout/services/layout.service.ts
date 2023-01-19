import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {


  public menuToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }
}
