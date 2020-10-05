import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StyleService } from 'src/app/shared/services/style.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-input-tag',
  templateUrl: './input-tag.component.html',
  styleUrls: ['./input-tag.component.scss']
})
export class InputTagComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() formcontrolname: string;

  @Input() label: string;
  @Input() placeholder: string = '+ uma tag';
  
  @Input() backgroundColor: string = 'lightblue';
  @Input() wordColor: string = 'black';

  @Input() appearance: string = '';
  
  value: string; // NG MODEL
  data: Array<any>;
  
  @ViewChild('tagInput', { static: false }) tagInputRef: ElementRef;

  appearance$: Observable<string>;

  constructor(
    private _utilsService: UtilsService,
    private _styleService: StyleService
  ) { }

  ngOnInit() {
    this.appearance$ = this._styleService.appearance$;
    this.data = this.formGroup.get(this.formcontrolname).value ? [this.formGroup.get(this.formcontrolname).value] : [];
    this.formGroup.get(this.formcontrolname).setValue('');
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.value;

    if (event.code === 'Comma' || event.code === 'Space' || event.code === 'Enter') {
      this.addTag(inputValue);
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }

    let exist = this.data.length ? this.data.find(item => item === tag) : false;
    if (tag.length > 0 && !exist) {
      this.data.push(tag);
    }

    this.setFormValue();
    this.value = '';
  }

  removeTag(tag?: string): void {
    if (tag) {
      this.data = this.data.filter(item => item !== tag);
    }
    this.setFormValue();
  }

  setFormValue() {
    this.formGroup.get(this.formcontrolname).setValue(this.data);
  }

  checkRequired() {
    return this._utilsService.hasRequiredField(this.formGroup.get(this.formcontrolname));
  }

  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

}
