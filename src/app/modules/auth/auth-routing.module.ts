import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'agendamento',
      //   loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
      // },
      {
        path: 'exemplo',
        loadChildren: () => import('./example-page/example-page.module').then(m => m.ExamplePageModule)
      },
      {
        path: 'agendamento',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'funcionarios',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
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
