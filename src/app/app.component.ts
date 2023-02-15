import {Component, OnInit} from '@angular/core';
import {ThemeService} from "./shared/services/theme.service";
import {ThemeStorageKey} from "./shared/constants/local-storage-keys";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gradeo-ui';

  constructor(private themeService: ThemeService) {

  }

  ngOnInit(): void {
    this.themeService.setLastSelectedTheme();
  }


}
