import { Component } from '@angular/core';
import { StyleService } from './shared/services/style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Finanças';

  constructor(
    private _styleService: StyleService
  ) {
    this.setTheme();
  }

  private setTheme(): void {
    const themeColor = JSON.parse(localStorage.getItem('theme-color'));
    const themeType = JSON.parse(localStorage.getItem('theme-type'));
    if (themeColor) {
      this._styleService.setColor(themeColor);
    }
    if (themeType) {
      this._styleService.setStyle(themeType);
    }
  }
}
