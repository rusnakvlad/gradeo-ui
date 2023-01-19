import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../services/layout.service";

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  public logoUrl: string = "https://www.figma.com/file/IMkmmmjNK2z2e2Cx8NGlZL/Untitled?node-id=4%3A15&t=UODtvCO568UJFrpA-4";
  constructor(private layoutService: LayoutService) {
  }

  ngOnInit(): void {
  }

  expandSidebar() {
    this.layoutService.menuToggled.emit(true);
  }

}
