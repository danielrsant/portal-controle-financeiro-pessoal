import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from 'src/app/shared/components/several-components/loading/loading.service';
import { Operation } from 'src/app/shared/enums/operation';
import { UtilsService } from 'src/app/shared/services/utils.service';


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

  data = [
    { id: 1, description: 'Descrição', done: false },
    { id: 2, description: 'Descrição', done: false },
    { id: 3, description: 'Descrição', done: false },
    { id: 4, description: 'Descrição', done: false },
    { id: 5, description: 'Descrição', done: true },
    { id: 6, description: 'Descrição', done: true },
    { id: 7, description: 'Descrição', done: true },
    { id: 8, description: 'Descrição', done: true },
  ];

  toDo = [];
  done = [];

  showInputNewToDo = false;
  showInputNewDone = false;

  editIndexToDo: number;
  editIndexDone: number;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _utilsService: UtilsService,
    private _loadingService: LoadingService,
    private _categoryService: CategoryService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      newToDo: new FormControl(),
      editToDo: new FormControl(),
      newDone: new FormControl(),
      editDone: new FormControl()
    });

    this.separateData();
  }

  separateData(): void {
    this.data.forEach(element => {
      if (element.done) {
        this.done.push(element);
      } else {
        this.toDo.push(element);
      }
    });
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

      this.data.map(element => {
        if (element.id === obj.id) {
          if (type === 'done') {
            element.done = true;
          } else {
            element.done = false;
          }
        }
      });

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
    this.data = this.data.map(element => {
      if (element.id === item.id) {
        element.description = event.target.value;
      }
      return element;
    });

    if (type === 'toDo') {
      this.editIndexToDo = null;
    } else {
      this.editIndexDone = null;
    }
  }

  create(type: 'toDo' | 'done', event): void {
    if (type === 'toDo') {
      this.toDo.splice(0, 0 , { id: this.toDo.length, description: event.target.value, done: false });
      this.form.get('newToDo').setValue(null);
    } else {
      this.done.splice(0, 0 , { id: this.done.length, description: event.target.value, done: true });
      this.form.get('newDone').setValue(null);
    }
  }

  delete(item): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
