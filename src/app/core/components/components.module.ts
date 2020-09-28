import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/app/shared/shared.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar/sidebar-item/sidebar-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PerfectScrollbarModule 
  ],
  declarations: [
    SidebarComponent,
    SidebarItemComponent
  ],
  exports: [
    SidebarComponent
  ]
})

export class ComponentsModule { }
