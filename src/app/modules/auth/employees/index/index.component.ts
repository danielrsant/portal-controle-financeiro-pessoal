import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  form: FormGroup;
  formLocalities: FormGroup;
  dtToday: Date = new Date();

  constructor(
    private _toastr: ToastrService,
    private _loadingService: LoadingService
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup({ 
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.maxLength(40), Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûÃãõç ]+$')]),
      lastName: new FormControl(null, [Validators.required, Validators.maxLength(40), Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûÃãõç ]+$')]),
      cpf: new FormControl(null, [Validators.required, Validators.maxLength(14)]),
      dtBirthday: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(120), Validators.pattern('^([a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[@][a-zA-Z0-9_-]+([.][a-zA-Z0-9_-]+)*[.][a-zA-Z]{2,4}){0,1}$')]),
      defaultPassword: new FormControl(null),
      cellPhone: new FormControl(null, Validators.maxLength(15)),
      status: new FormControl(1),
    });

    this.formLocalities = new FormGroup({
      id: new FormControl(null),
      zipCode: new FormControl(null, [Validators.required, Validators.maxLength(9)]),
      street: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(60)]),
      neighborhood: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(50)]),
      numAddress: new FormControl(null, [Validators.required, Validators.max(9999)]),
      complement: new FormControl(null, [Validators.maxLength(30)]),
      city: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(50)]),
      uf: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.maxLength(2)]),
      telephone: new FormControl(null, Validators.maxLength(14)),
    });
  }

  getZiCodeData(data): void {
    this._loadingService.show();
    // this._zipCodeService.loadOneZipCode(data).pipe(debounceTime(300), takeUntil(this.onDestroy$)).subscribe((response: any) => {
    //   if (response) {
    //     this.formLocalities.get('neighborhood').setValue(response.bairro)
    //     this.formLocalities.get('street').setValue(response.logradouro)
    //     this.formLocalities.get('uf').setValue(response.uf)
    //     this.formLocalities.get('city').setValue(response.localidade)
    //   }
    //   this._loadingService.hide();
    // },
    //   error => {
    //     this._loadingService.hide();
    //     this._toastr.error('Não foi possível encontrar CEP!');
    //   })
  }

}
