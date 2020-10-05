import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Style, StyleService } from 'src/app/shared/services/style.service';
import { ColorVariable, colorVariables } from 'src/app/shared/utils/color-variables';


@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  @Input() showMessages = false;

  form: FormGroup;

  colorVariables = colorVariables;
  selectedStyle$ = this._styleService.style$;
  selectedColor = colorVariables.blue;
  Style = Style;

  formTypes = [
    {id: 'legacy', description: 'Legacy'},
    {id: 'standard', description: 'Standard'},
    {id: 'fill', description: 'Fill'},
    {id: 'outline', description: 'Outline'}
  ];

  dataRadio = [
    {id: 1, description: 'Opção exemplo 1'},
    {id: 2, description: 'Opção exemplo 2'},
    {id: 3, description: 'Opção exemplo 3'}
  ];

  darkTheme = false;

  constructor(
    private _styleService: StyleService,
    ) { }

  ngOnInit(): void {
    this.createForm();
    if (localStorage.getItem('theme-type') && localStorage.getItem('theme-type') !== '"style-light"') {
      this.darkTheme = true;
    }
  }

  selectColor(color: ColorVariable): void {
    this._styleService.setColor(color);
  }

  isSelectedColor(color: ColorVariable): boolean {
    return isEqual(color, this.selectedColor);
  }

  onChangeBtnToggle(event): void {
    if (event.value === 'dark') {
      this._styleService.setStyle(Style.dark);
    } else {
      this._styleService.setStyle(Style.light);
    }
  }

  changeTypeInput(event): void {
    const type = event.value;
    this._styleService.setInputTheme(type);
  }

  createForm(): void {
    this.form = new FormGroup({
      dtInitial: new FormControl(null),
      dtFinal: new FormControl(null),
      text: new FormControl(null),
      appearance: new FormControl('outline'),
      select: new FormControl(null),
      autocomplete: new FormControl(null),
    });
  }

}
