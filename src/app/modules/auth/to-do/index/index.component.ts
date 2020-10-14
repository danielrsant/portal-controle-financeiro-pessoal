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

  title = 'Gerenciador de Tarefas';
  icon = 'content_paste';
  operation: Operation = Operation.INDEX;

  form: FormGroup;
  destroy$ = new Subject();

  toDo = [];
  done = [];

  showInputNewToDo = false;
  showInputNewDone = false;

  editIndexToDo: number;
  editIndexDone: number;

  constructor(
    private _toDoService: ToDoService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      newToDo: new FormControl(),
      editToDo: new FormControl(),
      newDone: new FormControl(),
      editDone: new FormControl()
    });
    
    this.onRefresh();
  }

  onRefresh(): void {
    this._toDoService.loadAll().pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          this.toDo = [];
          this.done = [];
          response.data.forEach(element => {
            if (element.concluido) {
              this.done.push(element);
            } else {
              this.toDo.push(element);
            }
          });

          console.log(response);
          
        }
      },
      (error) => {
        this._toastr.error(error.error.message);
      }
    );
  }


  drop(event: CdkDragDrop<string[]>, type: 'toDo' | 'done'): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const obj: any = event.container.data[event.currentIndex];
      obj.pessoa = obj.pessoa.id;
      if (type === 'toDo') {
        obj.concluido = false;
      } else {
        obj.concluido = true;
      }
      
      this.save(obj);
    }
  }

  addToDo(type): void {
    this.showInputNewToDo = !this.showInputNewToDo;
  }

  addDone(type): void {
    this.showInputNewDone = !this.showInputNewDone;
  }

  editToDo(index): void {
    if (index === this.editIndexToDo) {
      this.editIndexToDo = null;
    } else {
      this.editIndexToDo = index;
    }
  }

  editDone(index): void {
    if (index === this.editIndexDone) {
      this.editIndexDone = null;
    } else {
      this.editIndexDone = index;
    }
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

  create(type: 'toDo' | 'done', event): void {
    const payload = {
      descricao: event.target.value, 
      concluido: type === 'toDo' ? false : true,
      pessoa: JSON.parse(localStorage.getItem('user')).id
    };

    this.save(payload);
  }

  save(payload): void {
    this._toDoService.save(payload).pipe(takeUntil(this.destroy$)).subscribe(
      (response: any) => {
        if (response) {
          if (payload.id) {
            this._toastr.success('Atualizado com Sucesso!');     
            if (payload.concluido) {
              this.editIndexDone = null;
            } else {
              this.editIndexToDo = null;
            }
          } else {
            this._toastr.success('Adicionado com Sucesso!');
            if (payload.concluido) {
              this.showInputNewDone = false;
            } else {
              this.showInputNewToDo = false;
            }
          }
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
