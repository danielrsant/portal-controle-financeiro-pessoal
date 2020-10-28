import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Operation } from 'src/app/shared/enums/operation';

import { ToDoService } from '../../../../services/to-do.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {

  title = 'Lembretes';
  icon = 'content_paste';
  operation: Operation = Operation.INDEX;

  toDo = [];

  form: FormGroup;
  destroy$ = new Subject();

  constructor(
    private _toDoService: ToDoService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      newToDo: new FormControl(),
    });
    this.onRefresh();
  }

  onRefresh(): void {
    this._toDoService.loadAll().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          console.log(response);
          this.toDo = [];
          response.data.forEach(element => {
            if (!element.concluido) {
              this.toDo.push(element);
            } 
          });
        }
      },
      (error) => {
        this._toastr.error(error.error.message);
      }
    );
  }

  update(item, type: 'toDo' | 'done', event): void {
    const payload = {
      id: item.id,
      descricao: event.target.value, 
      concluido: type === 'toDo' ? false : true,
      pessoa: JSON.parse(localStorage.getItem('user')).id
    };
    
    this.save(payload);
  }

  create(event): void {
    const payload = {
      descricao: event.target.value, 
      concluido:  false,
      pessoa: JSON.parse(localStorage.getItem('user')).id
    };

    this.save(payload);
  }

  save(payload): void {
    this._toDoService.save(payload).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          console.log(response);
          
          this.onRefresh();
        }
      },
      (error) => {
        this._toastr.error(error.error.message);
      }
    );
  }

  delete(item): void {
    this._toDoService.destroy(item.id).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
          this._toastr.success('Excluído com Sucesso!');
          this.onRefresh();
      },
      (error) => {
        this._toastr.error(error.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
