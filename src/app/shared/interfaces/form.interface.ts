import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { Operation } from '../enums/operation';

export interface IForm {
  title: string;
  id: number;
  operation: Operation;
  form: FormGroup;
  onDestroy$: Subject<boolean>;

  setOperation(): void;
  createForm(): void;
  fillForm(): void;
  onSave(payload?): void;
}
