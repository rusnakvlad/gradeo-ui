import {EventEmitter, Inject, Injectable, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ThemeStorageKey} from "../constants/local-storage-keys";
import {Theme} from "../enums/theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = 'assets/styles/theme/' + theme + '/theme.css';
      localStorage.setItem(ThemeStorageKey, theme);
    }
  }

  setLastSelectedTheme() {
    let lastSelectedKey = localStorage.getItem(ThemeStorageKey)
    if (lastSelectedKey) {
      if (lastSelectedKey == Theme.LightMode) {
        this.switchTheme(Theme.LightMode);
      } else {
        this.switchTheme(Theme.DarkMode);
      }
    }
  }

  isLastSelectedDarkMode(): boolean{
    return localStorage.getItem(ThemeStorageKey) == Theme.DarkMode;
  }

}
