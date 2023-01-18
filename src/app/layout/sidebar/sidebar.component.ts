import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() expandMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  public display: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onExpandMenu() {
    this.display = true;
  }
}
