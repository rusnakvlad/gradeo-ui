import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {LayoutService} from "../services/layout.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public display: boolean = false;

  constructor(private layoutService: LayoutService) {
    layoutService.menuToggled.subscribe(sidebarState => this.display = sidebarState);
  }

  ngOnInit(): void {

  }

}
