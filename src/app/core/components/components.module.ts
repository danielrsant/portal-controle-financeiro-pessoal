import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { SidenavItemComponent } from './sidebar/sidenav-item/sidenav-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    SidebarComponent,
    SidenavItemComponent
  ],
  exports: [
    SidebarComponent
  ]
})

export class ComponentsModule { }
