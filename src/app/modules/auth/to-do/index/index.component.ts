import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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

  movies = [{
    name: 'Episode I - The Phantom Menace',
    isDisable: false
  }, {
    name: 'Episode II - Attack of the Clones',
    isDisable: false
  }, {
    name: 'Episode III - Revenge of the Sith',
    isDisable: false
  }, {
    name: 'Episode IV - A New Hope',
    isDisable: false
  }, {
    name: 'Episode V - The Empire Strikes Back',
    isDisable: false
  }, {
    name: 'Episode VI - Return of the Jedi',
    isDisable: false
  }
  ];

  showInput = false;

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
      description: new FormControl()
    });
   }


  delete(index: any): void {
    this.movies.splice(index, 1);
  }

  onAdd(): void {
    this.movies.push({
      name: 'new item',
      isDisable: false
    });
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}