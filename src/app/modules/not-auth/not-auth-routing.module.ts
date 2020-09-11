import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      },
      {
        path: 'erro',
        loadChildren: () => import('../errors/404/error-404.module').then(m => m.Error404Module)
      },
      {
        path: '**',
        redirectTo: 'customizar'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotAuthRoutingModule { }
