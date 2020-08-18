import { NestedTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import * as arrayToTree from 'array-to-tree';
import { Operation } from 'src/app/shared/enums/operation';

import { LoadingService } from '../loading/loading.service';

interface Node {
  id: number;
  title: string;
  checked?: boolean;
  children?: Node[];
}

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.scss'],
})
export class AclComponent implements OnInit, AfterViewInit {

  @Input() operation = Operation.VIEW;
  @Input() disabled = false;

  @Input() selecteds: any = [];
  @Input() data: any = [];

  @Input() customID = 'id'
  @Input() parentProperty = 'parentId'

  @Output() change = new EventEmitter();
  
  @ViewChild('tree', { static: false }) tree;

  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();

  checkeds: any = [];
  indeterminate = false;

  constructor(private _loadingService: LoadingService) { }

  ngOnInit() {
    this._loadingService.show();
    this.selecteds = this.selecteds ? this.selecteds : [];
    this.setCheckeds();
    this.formatData();
    this.change.emit(this.checkeds);
    this._loadingService.hide();
  }

  ngAfterViewInit() {
    this.treeControl.dataNodes = this.data;
    this.tree.treeControl.expandAll();
  }

  setCheckeds() {
    if ((this.operation !== Operation.NEW) && this.selecteds.length) {

      this.selecteds = this.selecteds.map(element => {
        this.data.map((item, index) => {
          if (element[this.customID] === item[this.customID]) {
            element.checked = true;
            item.checked = true;
          }
          return item;
        })
        return element;
      });

      this.checkeds = this.selecteds; // array for output
    }
  }

  formatData() {
    this.data.sort((a, b) => a.title > b.title ? 1 : -1);

    this.data = arrayToTree(this.data, {
      parentProperty: this.parentProperty,
      customID: this.customID
    });
    this.dataSource.data = this.data;
  }

  isAllSelected(node) {
    if (node.checked) {
      this.checkeds.push(node);
    } else {
      this.checkeds = this.checkeds.filter(element => element[this.customID] !== node[this.customID]);
    }

    this.dataSource.data.map((element) => {
      if (element[this.customID] === node[this.parentProperty]) {
        element.checked = node.checked;
        if (element.checked) {
          this.checkeds.push(element);
        } else {
          const hasSelected = element.children.filter(element => element.checked);

          if (!hasSelected.length) {
            this.checkeds = this.checkeds.filter(element => element[this.customID] !== node[this.parentProperty]);
          }
        }
      } else {
        this.verifyChildren(element, node);
      }
      return element;
    });

    this.checkeds = this.checkeds.filter((element, index) => {
      if (this.checkeds.findIndex(item => item.id === element.id) === index) {
        return true;
      }
    });
    this.change.emit(this.checkeds);
  }

  verifyChildren(element, node) {
    if (element.children) {
      element.children.map((item) => {
        if (item[this.customID] === node[this.parentProperty]) {

          item.checked = node.checked;
          if (item.checked) {
            this.checkeds.push(item);
          } else {
            const hasSelected = item.children.filter(element => element.checked);
            
            if (!hasSelected.length) {
              this.checkeds = this.checkeds.filter(element => element[this.customID] !== node[this.parentProperty]);
            }
          }
          return item;
        } else {
          if (item.children) {
            this.verifyChildren(item, node);
          } else {
            return;
          }
        }
      });
    } else {
      return;
    }
  }

  changeIndeterminate(node) {
    let descendants: any;
    descendants = this.treeControl.getDescendants(node);

    let hasChecked = descendants.filter(element => element.checked);

    if (!hasChecked.length) { return; }

    return !descendants.every(child => child.checked);
  }

  changeAllChildren(node) {
    if (node.checked) {
      this.checkeds.push(node);
    } else {
      this.checkeds = this.checkeds.filter(element => element[this.customID] !== node[this.customID]);
    }

    node.children = node.children.map(element => {
      if (node.checked) {
        element.checked = true;
        this.checkeds.push(element);
      } else {
        element.checked = false;
        this.checkeds = this.checkeds.filter(item => item[this.customID] !== element[this.customID]);
      }

      this.moreChildren(element, node.checked);
      return element;
    });

    this.checkeds = this.checkeds.filter((element, index) => {
      if (this.checkeds.findIndex(item => item.id === element.id) === index) {
        return true;
      }
    });
    this.change.emit(this.checkeds);
  }

  moreChildren(element, checked) {
    if (element.children) {
      element.children.map(item => {

        if (checked) {
          this.checkeds.push(item);
        } else {
          this.checkeds = this.checkeds.filter(element => item[this.customID] !== element[this.customID]);
        }

        item.checked = checked;

        if (item.children) {
          this.moreChildren(item, checked);
        }
      });
    } else {
      return;
    }
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;
}