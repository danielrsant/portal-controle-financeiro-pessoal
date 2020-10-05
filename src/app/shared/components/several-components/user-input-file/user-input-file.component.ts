import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-input-file',
  templateUrl: './user-input-file.component.html',
  styleUrls: ['./user-input-file.component.scss'], 
})
export class UserInputFileComponent implements OnInit, OnChanges {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label = 'Selecionar arquivo';
  @Input() placeholder: string;
  @Input() accept: string;

  @Input() isImage = false;
  @Input() showImage = false;
  @Input() disabled = false;

  @Output() insertedFile = new EventEmitter();

  filename: string;
  image: string | ArrayBuffer;
  position = 'start end';

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.disabled) {
      this.formGroup.get([this.formcontrolname]).disable();
    } else {
      this.formGroup.get([this.formcontrolname]).enable();
    }
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
      if (this.isImage) {
        this.formGroup.get(this.formcontrolname).setValue(null);
        // this._swalService.error('Selecione apenas imagens!!')
      }
      this.image = null;
    }

    this.insertedFile.emit(file);
  }

  removeFile(): void {
    this.filename = null;
  }

}

