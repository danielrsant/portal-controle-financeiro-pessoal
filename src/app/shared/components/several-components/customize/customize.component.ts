import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { CustomizeService } from 'src/app/shared/services/customize.service';
import { Style, StyleService } from 'src/app/shared/services/style.service';
import { ColorVariable, colorVariables } from 'src/app/shared/utils/color-variables';


@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

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
    {id: 1, description: 'Descrição 1'},
    {id: 2, description: 'Descrição 2'},
    {id: 3, description: 'Descrição 3'}
  ];

  dataTag = ['teste', 'ok'];

  constructor(
    private _customizeService: CustomizeService,
    private _styleService: StyleService,
    private _toastr: ToastrService
    ) { }

  ngOnInit(): void {
    // this._toastr.success('teste');
    // this._toastr.error('teste2');
    // this._toastr.warning('teste3');
    // this._toastr.info('teste4');
    this.createForm();
  }

  selectColor(color: ColorVariable): void {
    this._styleService.setColor(color);
  }

  isSelectedColor(color: ColorVariable): boolean {
    return isEqual(color, this.selectedColor);
  }

  enableDarkMode(): void {
    this._styleService.setStyle(Style.dark);
  }

  disableDarkMode(): void {
    this._styleService.setStyle(Style.light);
  }









  onChangeBtnToggle(value) {
    console.log('Selecionado => ', value);
  }

  changeTheme(theme?) {
      this._customizeService.setTheme(theme); 
      localStorage.setItem('theme', theme); 
  }

  createForm() {
    this.form = new FormGroup({ 
      dtInitial: new FormControl(null, Validators.required),
      dtFinal: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      autocomplete: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      select: new FormControl('outline', Validators.required),
      selectMultiple: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required),
      radio: new FormControl(null, Validators.required),
      tag: new FormControl(null, Validators.required),
    });
  }

}
