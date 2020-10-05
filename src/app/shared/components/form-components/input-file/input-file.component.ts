import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StyleService } from 'src/app/shared/services/style.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label = 'Selecionar arquivo';
  @Input() placeholder: string;

  @Input() showImage = true; // MOSTRA A VISUALIZAÇÃO DA IMAGEM

  @Input() multipleFiles = false; // PERMITE VARIAS ENTRADAS DE ARQUIVO
  @Input() accept: string; // ABRE MOSTRANDO O TIPO DE EXTENSÃO PASSADO, EXEMPLO: '.png'

  @Input() onlyImage = false;

  @Input() appearance: string = '';

  @Output() insertedFile = new EventEmitter();

  filename: string;
  image: string | ArrayBuffer;
  imgURL: string;

  position = 'start end';

  appearance$: Observable<string>;

  constructor(
    private _toastrService: ToastrService,
    private _styleService: StyleService
  ) { }

  ngOnInit(): void { 
    this.appearance$ = this._styleService.appearance$;
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList): void {
    const file = event && event.item(0);
    this.filename = file ? file.name : null;

    // Apenas le o arquivo se o mesmo for uma imagem
    if (file && file.type && file.type.match(/image\//)) {
      const reader = new FileReader();
      reader.onload = e => this.image = reader.result;
      reader.readAsDataURL(file);
      this.position = 'start center';
    } else {
      if (this.onlyImage) {
        this.formGroup.get(this.formcontrolname).setValue(null);
        this._toastrService.error('Selecione apenas imagens!!')
      }
      this.image = null;
    }

    this.insertedFile.emit(file);
  }

}

