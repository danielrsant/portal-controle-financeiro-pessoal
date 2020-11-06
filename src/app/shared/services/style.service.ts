import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ColorVariable } from '../utils/color-variables';

export enum Style {
  light = 'style-light',
  default = 'style-default',
  dark = 'style-dark'
}

@Injectable({
  providedIn: 'root'
})
export class StyleService implements OnDestroy {

  defaultStyle = Style.default;

  private _styleSubject = new BehaviorSubject<Style>(this.defaultStyle);
  style$ = this._styleSubject.asObservable();

  private _imageSubject = new BehaviorSubject<any>(localStorage.getItem('userPhoto') ? localStorage.getItem('userPhoto') : 'assets/images/users/1.png');
  image$ = this._imageSubject.asObservable();

  private _inputThemeSubject = new BehaviorSubject<any>(localStorage.getItem('theme-input') ? localStorage.getItem('theme-input') : 'outline');
  appearance$ = this._inputThemeSubject.asObservable();

  destroy$ = new Subject();

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.style$.pipe(takeUntil(this.destroy$)).subscribe(style => this._updateStyle(style));
  }

  setColor(color: ColorVariable): void {
    if (this.document) {
      localStorage.setItem('theme-color', JSON.stringify(color));
      this.document.documentElement.style.setProperty('--color-primary', color.default.replace('rgb(', '').replace(')', ''));
      this.document.documentElement.style.setProperty('--color-primary-contrast', color.contrast.replace('rgb(', '').replace(')', ''));
    }
  }

  setStyle(style: Style): void {
    localStorage.setItem('theme-type', JSON.stringify(style));
    this._styleSubject.next(style);
  }

  setInputTheme(appearance): void {
    localStorage.setItem('theme-input', appearance);
    this._inputThemeSubject.next(appearance);
  }

  setImage(image): void {
    localStorage.setItem('userPhoto', image);
    this._imageSubject.next(image);
  }

  private _updateStyle(style: Style): void {
    const body = this.document.body;

    Object.values(Style).filter(s => s !== style).forEach(value => {
      if (body.classList.contains(value)) {
        body.classList.remove(value);
      }
    });

    body.classList.add(style);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
