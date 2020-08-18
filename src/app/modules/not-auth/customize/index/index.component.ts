import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomizeService } from 'src/app/shared/services/customize.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  form: FormGroup;

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
    private _toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this._toastr.success('teste');
    this._toastr.error('teste2');
    this._toastr.warning('teste3');
    this._toastr.info('teste4');
    this.createForm();
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
