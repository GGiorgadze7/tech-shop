import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark= signal<boolean>(false);

  constructor() {
    const saved =localStorage.getItem('theme');
    const dark = saved=== 'dark';
    this.isDark.set(dark);
    this.applyTheme(dark);
  }

  toggle() {
    const next =!this.isDark();
    this.isDark.set(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    this.applyTheme(next);
  }

  private applyTheme(dark: boolean) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

}
