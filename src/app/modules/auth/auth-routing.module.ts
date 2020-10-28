import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendario',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'customizar',
        loadChildren: () => import('./customize/customize.module').then(m => m.CustomizeModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      // {
      //   path: 'fazer',
      //   loadChildren: () => import('./to-do/to-do.module').then(m => m.ToDoModule)
      // },
      {
        path: 'funcionarios',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'movimentacoes',
        loadChildren: () => import('./financial-movement/financial-movement.module').then(m => m.FinancialMovementModule)
      },
      {
        path: 'planejamento',
        loadChildren: () => import('./planner/planner.module').then(m => m.PlannerModule)
      },
      {
        path: 'contas',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'objetivos',
        loadChildren: () => import('./objective/objective.module').then(m => m.ObjectiveModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'erro',
        loadChildren: () => import('../errors/404/error-404.module').then(m => m.Error404Module)
      },
      {
        path: '**',
        redirectTo: 'home'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
